import { ComponentMetadata } from '@/types/component';

export const onHoverExpandMetadata: ComponentMetadata = {
  id: 'on-hover-expand',
  name: 'Hover Expand Cards',
  description: 'Smooth GSAP-powered card expansion animation with customizable orientation and scaling effects.',
  category: 'hover-effects',
  tags: ['hover', 'expand', 'cards', 'gsap', 'animation', 'responsive'],
  difficulty: 'intermediate',
  dependencies: ['gsap', 'react', 'typescript'],
  version: '1.0.0',
  author: 'Mimesis UI',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  preview: {
    image: '/previews/on-hover-expand.jpg',
    video: '/previews/on-hover-expand.mp4'
  },
  props: [
    {
      name: 'data',
      type: 'CardData[]',
      required: true,
      description: 'Array of card data containing src, alt, and code properties'
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      required: false,
      default: 'horizontal',
      description: 'Layout direction for card expansion',
      options: ['horizontal', 'vertical']
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      description: 'Custom CSS classes for the container'
    },
    {
      name: 'cardHeight',
      type: 'string',
      required: false,
      default: '100vh',
      description: 'Height of individual cards'
    },
    {
      name: 'cardWidth',
      type: 'string',
      required: false,
      default: '20vw',
      description: 'Width of individual cards'
    },
    {
      name: 'expandedSize',
      type: 'string',
      required: false,
      default: '30vw',
      description: 'Size when card is expanded'
    },
    {
      name: 'collapsedSize',
      type: 'string',
      required: false,
      default: '8vw',
      description: 'Size when card is collapsed'
    }
  ],
  examples: [
    {
      name: 'Basic Horizontal Layout',
      description: 'Simple horizontal card expansion with default settings',
      code: `<OnHoverExpand 
  data={cardData}
  orientation="horizontal"
  className="min-h-screen bg-gray-900"
/>`
    },
    {
      name: 'Vertical Layout',
      description: 'Vertical card expansion with custom dimensions',
      code: `<OnHoverExpand 
  data={cardData}
  orientation="vertical"
  className="w-full"
  cardWidth="300px"
  cardHeight="5vh"
  expandedSize="25vh"
  collapsedSize="5vh"
/>`
    },
    {
      name: 'Custom Styling',
      description: 'Custom container styling with modified expansion sizes',
      code: `<OnHoverExpand 
  data={cardData}
  className="my-custom-container rounded-lg"
  expandedSize="35vw"
  collapsedSize="10vw"
/>`
    }
  ]
};