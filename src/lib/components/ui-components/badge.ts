import { ComponentMetadata } from '@/types/component';

export const badgeMetadata: ComponentMetadata = {
  id: 'badge',
  name: 'Badge',
  description: 'A versatile badge component with multiple variants for displaying status, labels, and notifications.',
  category: 'ui-components',
  tags: ['badge', 'label', 'status', 'notification', 'ui'],
  difficulty: 'beginner',
  dependencies: ['react', 'typescript', 'class-variance-authority'],
  version: '1.0.0',
  author: 'Mimesis UI',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  preview: {
    image: '/previews/badge.jpg'
  },
  props: [
    {
      name: 'variant',
      type: "'default' | 'secondary' | 'destructive' | 'outline'",
      required: false,
      default: 'default',
      description: 'Visual style variant of the badge',
      options: ['default', 'secondary', 'destructive', 'outline']
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      description: 'Additional CSS classes to apply to the badge'
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'Content to display inside the badge'
    }
  ],
  installation: {
    code: `npm install react typescript class-variance-authority
# or
yarn add react typescript class-variance-authority`,
    language: 'bash'
  },
  usage: {
    code: `import { Badge } from '@/components/ui/badge';

export function Example() {
  return (
    <div className="flex gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}`,
    language: 'tsx'
  },
  examples: [
    {
      name: 'Basic Usage',
      description: 'Simple badge with default styling',
      code: `<Badge>Default</Badge>`
    },
    {
      name: 'Variants',
      description: 'Different badge variants for various use cases',
      code: `<div className="flex gap-2">
  <Badge variant="default">Default</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="destructive">Destructive</Badge>
  <Badge variant="outline">Outline</Badge>
</div>`
    },
    {
      name: 'With Custom Content',
      description: 'Badge with icons and custom content',
      code: `<div className="flex gap-2">
  <Badge>
    <Star className="w-3 h-3 mr-1" />
    Featured
  </Badge>
  <Badge variant="secondary">
    New
  </Badge>
  <Badge variant="destructive">
    99+
  </Badge>
</div>`
    }
  ]
};