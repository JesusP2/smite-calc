import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function pathToName(path: string) {
  return path
    .split('/')
    .slice(-1)
    .join('')
    .split('.')[0]
    .split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

export function rippleEffect(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  const btn = event.currentTarget;
	const circle = document.createElement("span");
	const diameter = Math.max(btn.clientWidth, btn.clientHeight);
	const radius = diameter / 2;

	circle.style.width = circle.style.height = `${diameter}px`;
	circle.style.left = `${event.clientX - (btn.offsetLeft + radius)}px`;
	circle.style.top = `${event.clientY - (btn.offsetTop + radius)}px`;
	circle.classList.add("ripple");

	const ripple = btn.getElementsByClassName("ripple")[0];

	if (ripple) {
		ripple.remove();
	}

	btn.appendChild(circle);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
