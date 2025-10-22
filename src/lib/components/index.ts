import { ComponentRegistry } from '@/types/component';
import { onHoverExpandMetadata } from './hover-effects/on-hover-expand';
import { badgeMetadata } from './ui-components/badge';

export const componentRegistry: ComponentRegistry = {
  'on-hover-expand': onHoverExpandMetadata,
  'badge': badgeMetadata,
};

export const getComponentsByCategory = (category: string) => {
  return Object.values(componentRegistry).filter(
    component => component.category === category
  );
};

export const getAllCategories = () => {
  const categories = new Set(
    Object.values(componentRegistry).map(component => component.category)
  );
  return Array.from(categories);
};

export const getComponentById = (id: string) => {
  return componentRegistry[id];
};

export const searchComponents = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return Object.values(componentRegistry).filter(
    component =>
      component.name.toLowerCase().includes(lowercaseQuery) ||
      component.description.toLowerCase().includes(lowercaseQuery) ||
      component.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};