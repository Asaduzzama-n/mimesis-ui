export interface ComponentMetadata {
  id: string;
  name: string;
  description: string;
  category: 'hover-effects' | 'animations' | 'transitions' | 'interactions' | 'ui-components';
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  dependencies: string[];
  version: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  preview: {
    image?: string;
    video?: string;
  };
  props: ComponentProp[];
  examples: ComponentExample[];
  installation?: {
    code: string;
    language?: string;
  };
  usage?: {
    code: string;
    language?: string;
  };
}

export interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  default?: any;
  description: string;
  options?: string[];
}

export interface ComponentExample {
  name: string;
  description: string;
  code: string;
  props?: Record<string, any>;
}

export interface ComponentRegistry {
  [key: string]: ComponentMetadata;
}

export interface NavigationItem {
  id: string;
  name: string;
  href: string;
  icon?: string;
  children?: NavigationItem[];
}

export interface SidebarCategory {
  id: string;
  name: string;
  components: ComponentMetadata[];
}