export function addBarGraph(
  container: Element,
  label: string,
  value: number,
  maxValue: number,
  color: string,
  position: { x: number; y: number; z: number }
) {
  const bar = document.createElement("a-box");
  const labelText = document.createElement("a-text");
  const valueText = document.createElement("a-text");

  bar.setAttribute("id", `a${label}-bar`);
  bar.setAttribute(
    "position",
    `${position.x} ${position.y + (value / maxValue) * 2} ${position.z}`
  );
  bar.setAttribute("scale", `0.5 ${(value / maxValue) * 4} 0.5`);
  bar.setAttribute("color", color);

  labelText.setAttribute("id", `a${label}-label`);
  labelText.setAttribute(
    "position",
    `${position.x} ${position.y + 0.5} ${position.z + 1}`
  );
  labelText.setAttribute(
    "text",
    `value: ${label}; align: center; color: white; width: 4; wrapCount: 20;`
  );

  const textValue = maxValue === 100 ? `${value}%` : value;
  valueText.setAttribute("id", `a${label}-value`);
  valueText.setAttribute(
    "position",
    `${position.x} ${position.y} ${position.z + 0.5}`
  );
  valueText.setAttribute(
    "text",
    `value: ${textValue}; align: center; color: white; width: 4; wrapCount: 20;`
  );

  container.appendChild(bar);
  container.appendChild(labelText);
  container.appendChild(valueText);
}

export function removeBarGraph(label: string) {
  document.getElementById(`a${label}-bar`)!.remove();
  document.getElementById(`a${label}-label`)!.remove();
  document.getElementById(`a${label}-value`)!.remove();
}
