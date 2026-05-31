import { Target, Eye, Heart, Star, BookOpen, Shield, Award, Users } from "lucide-react";

const coreValues = [
  { icon: Heart, label: "Ikhlāṣ (Sincerity)", desc: "Every action driven by pure intention for Allah's sake" },
  { icon: BookOpen, label: "Adab (Islamic Etiquette)", desc: "Upholding prophetic manners in learning and teaching" },
  { icon: Award, label: "Excellence in Teaching", desc: "Delivering world-class Arabic education with qualified scholars" },
  { icon: Shield, label: "Discipline & Consistency", desc: "Building strong habits through structured learning" },
  { icon: Star, label: "Honesty & Integrity", desc: "Maintaining academic truthfulness and transparency" },
  { icon: Users, label: "Respect for Knowledge", desc: "Honoring the sacred tradition of Islamic scholarship" },
];

const MissionVisionSection = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-max">
        <div className="text-center mb-14">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Who We Are</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Mission, Vision & Values
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Guided by faith, driven by excellence — building bridges to the Arabic language.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Mission */}
          <div className="bg-card rounded-2xl border border-border p-8 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-accent to-secondary rounded-l-2xl" />
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center">
                <Target size={24} className="text-foreground" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground">Our Mission</h3>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              At Allāhul Musta'ān Institute, our mission is to make Arabic education accessible, 
              transformative, and rooted in Islamic tradition. We strive to:
            </p>
            <ul className="space-y-3">
              {[
                "Deliver structured online Arabic education accessible to students worldwide",
                "Teach the skills of reading, writing, comprehension, and communication",
                "Provide Qur'ānic and classical Arabic knowledge",
                "Maintain an Islamic, respectful, and supportive learning environment",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Vision */}
          <div className="bg-card rounded-2xl border border-border p-8 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-primary to-green-light rounded-l-2xl" />
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl gradient-green flex items-center justify-center">
                <Eye size={24} className="text-primary-foreground" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground">Our Vision</h3>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              We envision a world where the Arabic language is no longer a barrier for those 
              seeking Islamic knowledge. Our vision at AMI is:
            </p>
            <ul className="space-y-3">
              {[
                "To bridge the gap between Arabic language and non-native speakers",
                "To graduate students capable of understanding Islamic texts confidently",
                "To preserve and spread the beauty of the Arabic language across communities",
                "To become the leading online Arabic institute for English-speaking Muslims worldwide",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Core Values */}
        <div className="text-center mb-10">
          <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Core Values</h3>
          <p className="text-muted-foreground">The principles that guide everything we do</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {coreValues.map((value) => (
            <div
              key={value.label}
              className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg hover:border-accent/30 transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                <value.icon size={26} />
              </div>
              <h4 className="font-heading text-lg font-semibold text-foreground mb-2">{value.label}</h4>
              <p className="text-muted-foreground text-sm">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
