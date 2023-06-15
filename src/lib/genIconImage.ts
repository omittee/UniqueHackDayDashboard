export enum IconType {
  QuestionCircle = '？',
  QuestionCircleO = '？',
  CloseCircle = '✖',
  CloseCircleO = '✖',
  UsergroupAdd = '⊕',
  CheckCircle = '✔',
  CheckCircleO = '✔',
  ExclamationCircle = '!',
}

function genIconImage(text: IconType, color: string) {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('width', '200');
  canvas.setAttribute('height', '200');
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '200px anticon';
    ctx.fillStyle = color;
    ctx.fillText(text, 0, 0);
    return canvas.toDataURL();
  }
  return null;
}

export default genIconImage;
