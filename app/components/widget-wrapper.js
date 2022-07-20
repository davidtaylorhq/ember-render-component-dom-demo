import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { getOwner } from '@ember/application';
import { action } from '@ember/object';

function renderComponent({ element, args, componentName, wrapperComponent }) {
  const component = getOwner(wrapperComponent)
    .factoryFor(`component:${componentName}`)
    .create(args);

  if (component.selectKit) {
    component.didReceiveAttrs();
  }

  component.renderer.appendTo(component, element);
  return component;
}

export default class WidgetWrapper extends Component {
  @tracked count = 0;

  @action
  renderComponent(element, componentName) {
    renderComponent({
      element,
      componentName: componentName,
      args: {
        namedOne: 'Hello world',
      },
      wrapperComponent: this,
    });
  }
}
