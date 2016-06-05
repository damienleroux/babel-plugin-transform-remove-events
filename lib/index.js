export default function () {
  return {
    visitor: {
      JSXAttribute(path) {
        if(path.node.name.name == 'onClick'){
          path.remove();
        }
      }
    }
  };
}