<template>
 <div class="relative w-screen h-screen overflow-hidden">
    <!-- Title and Description -->
    <div
      v-if="showInfo"
      class="absolute top-6 left-1/2 transform -translate-x-1/2 max-w-2xl bg-white/90 dark:bg-gray-900/90 p-4 rounded-lg shadow-md z-10"
    >
      <!-- Close button, visible only on small screens -->
      <button
        @click="showInfo = false"
        class="sm:hidden absolute top-2 right-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-bold text-xl leading-none"
        aria-label="Close info"
      >
        ×
      </button>

      <h1 class="text-3xl font-bold text-center mb-2">Ilir's Projects Map</h1>
      <p class="text-gray-800 dark:text-gray-200 mb-1">
        This interactive map showcases Ilir’s various projects, each represented by a symbol based on its type.
      </p>
      <p class="text-gray-800 dark:text-gray-200 mb-1">
        Every project is in a way <strong>connected</strong> to another that's why I decided this non linear way of having a general view of my projects,that being said if you <strong>click</strong> on one of the nodes you'll either find the github link or be redirected to it's blog post where I discuss it's creation and it's porpouses.
      </p>
    </div>


    <!-- Map SVG -->
    <svg ref="svg" class="w-screen h-screen bg-gray-100 dark:bg-gray-800"></svg>

    <!-- Node Info Box -->
    <div v-if="selectedNode" class="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md max-w-md z-10">
      <h2 class="text-xl font-semibold">{{ selectedNode.id }}</h2>
      <p class="text-gray-700 dark:text-gray-300">{{ selectedNode.description }}</p>
    </div>

    <!-- Legend -->
    <div class="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-800/90 p-3 rounded-lg text-sm shadow z-10">
      <p><strong>Legend:</strong></p>
      <p>● Site</p>
      <p>■ Script</p>
      <p>▲ Embedded</p>
    </div>

    <!-- Back Arrow -->
    <router-link
      to="/"
      class="absolute bottom-4 left-4 text-3xl text-gray-700 dark:text-gray-300 hover:text-gray-500"
      title="Torna alla home"
    >
      ←
    </router-link>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
import * as d3 from 'd3'
import type { SimulationLinkDatum } from 'd3'

const showInfo = ref(true)

interface NodeData {
  id: string
  description?: string
  shape: 'circle' | 'square' | 'triangle' | 'pentagon' | 'octagon'
  color: string
  github?: string
  fx?: number | null
  fy?: number | null
  x?: number
  y?: number
}

const svg = ref<SVGSVGElement | null>(null)
const selectedNode = ref<NodeData | null>(null)

const randomGray = () => {
  const g = Math.floor(Math.random() * 100 + 100) // between 100 and 199
  return `rgb(${g}, ${g}, ${g})`
}


const nodes: NodeData[] = [
  {
    id: 'Ilir Lika',
    shape: 'octagon',
    color: '#333',
  },
  {
    id: 'Commercial',
    shape: 'pentagon',
    color: '#555',
  },
  {
    id: 'Personal',
    shape: 'pentagon',
    color: '#555',
  },
  {
    id: 'School',
    shape: 'pentagon',
    color: '#555',
  },
  {
    id: 'TradeKR',
    description: 'Script to assist with item trading on krunker.io',
    shape: 'square',
    color: randomGray(),
    github: 'https://github.com/1ilir0lika/tradeKR'
  },
  {
    id: "L'Oasi di Villar",
    description: 'Site for a local business',
    shape: 'circle',
    color: randomGray(),
    github: ''
  },
  {
    id: 'Ilir Lika Blog',
    description: 'Personal blog site',
    shape: 'circle',
    color: randomGray(),
    github: 'https://ilirlika-site.vercel.app/blog/articles/post1/post1.html'
  }
]

const links: SimulationLinkDatum<NodeData>[] = [
  { source: nodes[0], target: nodes[1] },
  { source: nodes[0], target: nodes[2] },
  { source: nodes[0], target: nodes[3] },
  { source: nodes[1], target: nodes[4] },
  { source: nodes[1], target: nodes[5] },
  { source: nodes[2], target: nodes[6] }
]

onMounted(() => {
  if (!svg.value) return

  const width = svg.value.clientWidth
  const height = svg.value.clientHeight

  const svgEl = d3.select(svg.value)
    .attr('width', width)
    .attr('height', height)

  const zoomLayer = svgEl.append('g')

  svgEl.call(
    d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 2])
      .on('zoom', (event) => {
        zoomLayer.attr('transform', event.transform)
      })
  )

  const simulation = d3.forceSimulation<NodeData>(nodes)
    .force('link', d3.forceLink<NodeData, SimulationLinkDatum<NodeData>>(links).id(d => d.id).distance(200))
    .force('charge', d3.forceManyBody().strength(-400))
    .force('center', d3.forceCenter(width / 2, height / 2))

  const link = zoomLayer.append('g')
    .attr('stroke', '#aaa')
    .attr('stroke-opacity', 0.6)
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke-width', 2)

  const nodeGroup = zoomLayer.append('g')
    .selectAll<SVGGElement, NodeData>('g')
    .data(nodes)
    .join('g')
    .on('click', (_, d) => {
      if (d.github) selectedNode.value = d
    })
    .on('dblclick', (_, d) => {
      if (d.github) window.open(d.github, '_blank')
    })
    .call(
      d3.drag<SVGGElement, NodeData>()
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

  nodeGroup.append('title').text(d => `${d.id}\n${d.description || ''}`)

  nodeGroup.each(function (d) {
    const group = d3.select(this)

    switch (d.shape) {
      case 'circle':
        group.append('circle').attr('r', 25).attr('fill', d.color)
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
      case 'pentagon':
        group.append('path')
          .attr('d', generateRegularPolygonPath(5, 50))
          .attr('fill', d.color)
        break
      case 'octagon':
        group.append('path')
          .attr('d', generateRegularPolygonPath(8, 60))
          .attr('fill', d.color)
        break
    }

    if (d.shape === 'pentagon' || d.shape === 'octagon') {
      group.append('text')
        .text(d.id)
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .attr('pointer-events', 'none')
        .attr('fill', '#fff')
        .attr('font-size', d.shape === 'octagon' ? '16px' : '14px')
        .attr('font-weight', 'bold')
    }
  })

  simulation.on('tick', () => {
    link
      .attr('x1', d => (d.source as NodeData).x!)
      .attr('y1', d => (d.source as NodeData).y!)
      .attr('x2', d => (d.target as NodeData).x!)
      .attr('y2', d => (d.target as NodeData).y!)

    nodeGroup.attr('transform', d => `translate(${d.x},${d.y})`)
  })
})

function generateRegularPolygonPath(sides: number, radius: number): string {
  const angle = Math.PI * 2 / sides
  let path = ''
  for (let i = 0; i < sides; i++) {
    const x = radius * Math.cos(angle * i)
    const y = radius * Math.sin(angle * i)
    path += (i === 0 ? 'M' : 'L') + x + ',' + y
  }
  return path + 'Z'
}

</script>