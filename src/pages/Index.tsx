import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CoursesSection from "@/components/CoursesSection";
import DepartmentsSection from "@/components/DepartmentsSection";
import MissionVisionSection from "@/components/MissionVisionSection";
import PaymentSection from "@/components/PaymentSection";
import AcademicPoliciesSection from "@/components/AcademicPoliciesSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { GraduationCap, MessageCircle } from "lucide-react";
import { useState } from "react";
import AdmissionFormDialog from "@/components/AdmissionFormDialog";

const WHATSAPP_NUMBER = "233550545403";

const Index = () => {
  const [showAdmission, setShowAdmission] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <CoursesSection />

      {/* Apply Now Section */}
      <section id="apply-now-section" className="section-padding bg-primary/5">
        <div className="container-max text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Apply now to join Allāhul Musta'ān Institute and start your path to mastering the Arabic language. Upon completing the 2-year program, you will receive a Certificate in Arabic Language & Islamic Studies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gold" size="lg" className="text-base px-8 py-6" onClick={() => setShowAdmission(true)}>
              <GraduationCap size={20} />
              Apply Now
            </Button>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Assalamu Alaikum, I would like to inquire about admission to Allāhul Musta'ān Institute.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-3.5 rounded-lg text-base font-semibold hover:bg-green-700 transition-colors shadow-md"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <DepartmentsSection />
      <AcademicPoliciesSection />
      <MissionVisionSection />
      <PaymentSection />
      <Footer />

      <AdmissionFormDialog open={showAdmission} onClose={() => setShowAdmission(false)} />
    </div>
  );
};

export default Index;
