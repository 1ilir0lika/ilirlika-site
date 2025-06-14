<template>
  <div class="projects-container">
    <h1 class="title">Ilir's Projects Map</h1>
    <svg ref="svg" class="map-svg"></svg>

    <div v-if="selectedNode" class="node-details">
      <h2>{{ selectedNode.id }}</h2>
      <p>{{ selectedNode.description }}</p>
    </div>

    <div class="legend">
      <p><strong>Legenda:</strong></p>
      <p>● Site</p>
      <p>■ Script</p>
      <p>▲ Embedded</p>
    </div>

    <router-link to="/" class="home-arrow" title="Torna alla home">←</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'

interface Node {
  id: string
  description: string
  shape: 'circle' | 'square' | 'triangle'
  color: string
  github: string
  x?: number
  y?: number
  fx?: number | null
  fy?: number | null
}

const svg = ref<SVGSVGElement | null>(null)
const selectedNode = ref<Node | null>(null)

const names = [
  'Project Alpha',
  'Project Beta',
  'Project Gamma',
  'Project Delta',
  'Project Epsilon',
  'Project Zeta',
  'Project Eta',
  'Project Theta'
]

const descriptions = [
  'Un progetto per gestire task con IA.',
  'Un sistema di monitoraggio in tempo reale.',
  'App mobile per la gestione delle finanze.',
  'Dashboard interattiva per dati aziendali.',
  'Plugin per migliorare la SEO di siti web.',
  'Tool per analisi dei dati sportivi.',
  'Sistema di raccomandazione per ecommerce.',
  'App per la gestione delle abitudini quotidiane.'
]

const githubLinks = [
  'https://github.com/user/project-alpha',
  'https://github.com/user/project-beta',
  'https://github.com/user/project-gamma',
  'https://github.com/user/project-delta',
  'https://github.com/user/project-epsilon',
  'https://github.com/user/project-zeta',
  'https://github.com/user/project-eta',
  'https://github.com/user/project-theta'
]

const shapes: Array<'circle' | 'square' | 'triangle'> = [
  'circle', 'square', 'triangle', 'circle',
  'square', 'triangle', 'circle', 'square'
]

const generateNodes = (): Node[] => {
  const grayScale = d3.scaleLinear<string>()
    .domain([0, names.length - 1])
    .range(['#dddddd', '#444444'])

  return names.map((name, i) => ({
    id: `${i + 1}. ${name}`,
    description: descriptions[i],
    shape: shapes[i],
    color: grayScale(i),
    github: githubLinks[i],
  }))
}

const nodes = generateNodes()

const links = [
  { source: nodes[0].id, target: nodes[1].id },
  { source: nodes[0].id, target: nodes[2].id },
  { source: nodes[1].id, target: nodes[3].id },
  { source: nodes[2].id, target: nodes[4].id },
  { source: nodes[5].id, target: nodes[6].id },
  { source: nodes[6].id, target: nodes[7].id }
]

onMounted(() => {
  if (!svg.value) return

  const width = svg.value.clientWidth
  const height = svg.value.clientHeight

  const svgEl = d3.select(svg.value)
    .attr('width', width)
    .attr('height', height)

  const simulation = d3.forceSimulation(nodes as any)
    .force('link', d3.forceLink(links as any).id((d: any) => d.id).distance(150))
    .force('charge', d3.forceManyBody().strength(-400))
    .force('center', d3.forceCenter(width / 2, height / 2))

  const link = svgEl.append('g')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.6)
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke-width', 2)

  const nodeGroup = svgEl.append('g')
    .selectAll('g')
    .data(nodes)
    .join('g')
    .on('mouseover', function (_, d) {
      d3.select(this).select('title').text(`${d.id}\n${d.description}`)
    })
    .on('click', (_, d) => {
      selectedNode.value = d
    })
    .on('dblclick', (_, d) => {
      window.open(d.github, '_blank')
    })
    .call(
      d3.drag<SVGGElement, Node>()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart()
          d.fx = d.x
          d.fy = d.y
        })
        .on('drag', (event, d) => {
          d.fx = event.x
          d.fy = event.y
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0)
          d.fx = null
          d.fy = null
        })
    )

  nodeGroup.append('title')

  nodeGroup.each(function (d) {
    const group = d3.select(this)
    switch (d.shape) {
      case 'circle':
        group.append('circle')
          .attr('r', 25)
          .attr('fill', d.color)
        break
      case 'square':
        group.append('rect')
          .attr('x', -20)
          .attr('y', -20)
          .attr('width', 40)
          .attr('height', 40)
          .attr('fill', d.color)
        break
      case 'triangle':
        group.append('path')
          .attr('d', d3.symbol().type(d3.symbolTriangle).size(1500)())
          .attr('fill', d.color)
        break
    }
  })

  simulation.on('tick', () => {
    link
      .attr('x1', (d: any) => d.source.x)
      .attr('y1', (d: any) => d.source.y)
      .attr('x2', (d: any) => d.target.x)
      .attr('y2', (d: any) => d.target.y)

    nodeGroup.attr('transform', d => `translate(${d.x},${d.y})`)
  })
})
</script>

<style scoped>
.projects-container {
  position: relative;
  height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}
.title {
  text-align: center;
  margin-bottom: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.map-svg {
  flex: 1;
  background: #f9f9f9;
  border: 1px solid #ccc;
}
.node-details {
  padding: 1rem;
  background: white;
  border-top: 1px solid #ddd;
  max-width: 600px;
  margin: 0 auto;
}
.legend {
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 0.9rem;
  color: #555;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}
.home-arrow {
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-size: 2rem;
  color: #333;
  text-decoration: none;
}
.home-arrow:hover {
  color: #777;
}
</style>
