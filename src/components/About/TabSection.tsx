import { useState } from 'react';
import { TABS } from './constants';
import TabCard from './TabCard';

export default function TabSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="grid md:grid-cols-3 gap-8 mb-20">
      {TABS.map((tab, index) => (
        <TabCard
          key={tab.title}
          {...tab}
          isActive={activeTab === index}
          onClick={() => setActiveTab(index)}
        />
      ))}
    </div>
  );
}