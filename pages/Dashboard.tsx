
import React from 'react';
import { DashboardHeader } from '../components/Dashboard/DashboardHeader';
import { DashboardHero } from '../components/Dashboard/DashboardHero';
import { CampaignCard } from '../components/Dashboard/CampaignCard';
import { CriticalPath } from '../components/Dashboard/CriticalPath';
import { ResonanceChart } from '../components/Dashboard/ResonanceChart';
import { NeuralStreamCard } from '../components/Dashboard/NeuralStreamCard';

export const Dashboard: React.FC = () => {
  return (
    <div className="flex-1 h-full overflow-y-auto no-scrollbar bg-[#fcfcfc] p-12 animate-in fade-in duration-1000">
      <DashboardHeader />
      <DashboardHero />

      {/* Secondary Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-1">
          <CampaignCard />
        </div>
        <div className="lg:col-span-2">
          <CriticalPath />
        </div>
      </section>

      {/* Live Signals Visualization */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-32">
         <div className="lg:col-span-3">
            <ResonanceChart />
         </div>
         <div className="lg:col-span-2">
            <NeuralStreamCard />
         </div>
      </section>
    </div>
  );
};
