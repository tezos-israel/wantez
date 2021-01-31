import Divider from 'components/shared/Divider';
import { Hero } from './Hero';
import { Features } from './Features';
import HowItWorks from './HowItWorks';
import Vision from './Vision';
import ContactForm from './ContactForm';
import { Footer } from '../Footer';

import data from 'data/home.json';

export function LandingPage() {
  return (
    <>
      <Hero title={data.title} about={data.about} />
      <Features features={data.features} />
      <Divider className="w-3/4 mx-auto my-20 border-blue-400 border-dashed" />
      <HowItWorks flowCharts={data.flowCharts} />
      <Vision text={data.vision.text} title={data.vision.title} />
      <ContactForm />
      <Footer />
    </>
  );
}
