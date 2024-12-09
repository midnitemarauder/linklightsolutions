import { MISSION_POINTS } from './constants';

export default function MissionPoints() {
  return (
    <ul className="space-y-4">
      {MISSION_POINTS.map(({ id, text }) => (
        <li key={id} className="flex items-center text-gray-400">
          <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
          {text}
        </li>
      ))}
    </ul>
  );
}