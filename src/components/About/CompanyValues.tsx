import { COMPANY_VALUES } from './constants';

export default function CompanyValues() {
  return (
    <div className="mt-20 grid md:grid-cols-3 gap-8">
      {COMPANY_VALUES.map((value, index) => {
        const Icon = value.icon;
        return (
          <div
            key={value.title}
            className="relative p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:-translate-y-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Icon className="h-8 w-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">{value.title}</h3>
            <p className="text-gray-400">{value.description}</p>
          </div>
        );
      })}
    </div>
  );
}