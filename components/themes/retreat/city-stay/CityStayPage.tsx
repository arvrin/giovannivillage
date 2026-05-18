import CityStayHeader from './CityStayHeader';
import CityStayHero from './CityStayHero';
import WhereItSits from './WhereItSits';
import CityStayRooms from './CityStayRooms';
import Included from './Included';
import FromTheFamily from './FromTheFamily';
import Nearby from './Nearby';
import PlanStay from './PlanStay';
import CityStayFooter from './CityStayFooter';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import type { CityStay } from '@/lib/city-stays';

/**
 * Single-page layout for a Giovanni city stay (House / Suites).
 * Both /house and /suites render this with their own data prop.
 */
const CityStayPage = ({ stay }: { stay: CityStay }) => {
  return (
    <>
      <CityStayHeader stay={stay} />
      <main className="overflow-hidden">
        <CityStayHero stay={stay} />
        <WhereItSits stay={stay} />
        <CityStayRooms stay={stay} />
        <Included stay={stay} />
        <FromTheFamily stay={stay} />
        <Nearby stay={stay} />
        <PlanStay stay={stay} />
      </main>
      <CityStayFooter stay={stay} />
      <WhatsAppButton phoneNumber={stay.whatsapp} message={`Hello ${stay.name}, I'd like to enquire about a stay.`} />
    </>
  );
};

export default CityStayPage;
