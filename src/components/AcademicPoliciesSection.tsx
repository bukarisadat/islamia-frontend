import { useState } from "react";
import {
  ClipboardCheck,
  CalendarCheck,
  FileText,
  Wallet,
  Award,
  CheckCircle2,
  Sparkles,
  GraduationCap,
} from "lucide-react";

const gradeData = [
  { grade: "95-100", classification: "Highly Excellent", letter: "A+", gpa: "5.0", tone: "from-emerald-500/20 to-emerald-500/5", letterBg: "bg-yellow-300 text-yellow-900" },
  { grade: "90-94", classification: "Excellent", letter: "A", gpa: "4.75", tone: "from-rose-400/20 to-rose-400/5", letterBg: "bg-yellow-300 text-yellow-900" },
  { grade: "85-89", classification: "More Than Very Good", letter: "B+", gpa: "4.5", tone: "from-emerald-500/20 to-emerald-500/5", letterBg: "bg-yellow-300 text-yellow-900" },
  { grade: "80-84", classification: "Very Good", letter: "B", gpa: "4.0", tone: "from-rose-400/20 to-rose-400/5", letterBg: "bg-yellow-300 text-yellow-900" },
  { grade: "75-79", classification: "More Than Good", letter: "C+", gpa: "3.5", tone: "from-emerald-500/20 to-emerald-500/5", letterBg: "bg-yellow-300 text-yellow-900" },
  { grade: "70-74", classification: "Good", letter: "C", gpa: "3.0", tone: "from-rose-400/20 to-rose-400/5", letterBg: "bg-yellow-300 text-yellow-900" },
  { grade: "65-69", classification: "More Than Acceptable", letter: "D+", gpa: "2.5", tone: "from-emerald-500/20 to-emerald-500/5", letterBg: "bg-yellow-300 text-yellow-900" },
  { grade: "60-64", classification: "Acceptable", letter: "D", gpa: "2.0", tone: "from-rose-400/20 to-rose-400/5", letterBg: "bg-yellow-300 text-yellow-900" },
  { grade: "<60", classification: "Failure", letter: "F", gpa: "1.0", tone: "from-orange-400/20 to-orange-400/5", letterBg: "bg-yellow-300 text-yellow-900" },
];

const policySections = [
  {
    id: "admissions",
    icon: ClipboardCheck,
    title: "Admissions Requirements",
    color: "from-primary to-green-light",
    items: [
      "Ability to attend online classes consistently",
      "Stable internet connection & basic device literacy",
      "Genuine commitment to Islamic etiquette (Adab)",
    ],
  },
  {
    id: "attendance",
    icon: CalendarCheck,
    title: "Attendance & Class Policies",
    color: "from-accent to-secondary",
    items: [
      "Minimum 75% attendance is required",
      "Repeated lateness affects participation marks",
      "Absence must be reported to the course facilitator",
      "Cameras may be required during assessments",
      "Students must sit in a quiet, respectful environment",
    ],
  },
  {
    id: "assessment",
    icon: FileText,
    title: "Assessment & Examination",
    color: "from-teal-600 to-emerald-700",
    items: [
      "Weekly assignments",
      "Class participation",
      "Periodic quizzes",
      "Mid-term examination",
      "Final examination",
    ],
  },
  {
    id: "passing",
    icon: CheckCircle2,
    title: "Passing Requirements",
    color: "from-primary to-teal-700",
    items: [
      "Minimum overall score of 60%",
      "Attendance requirement fulfilled",
      "All assignments duly submitted",
    ],
  },
  {
    id: "fees",
    icon: Wallet,
    title: "Fees, Refund & Payment Policies",
    color: "from-accent to-yellow-600",
    items: [
      "All fees must be paid before the start of classes",
      "Refunds allowed only within the first 7 days of the first class",
    ],
  },
  {
    id: "graduation",
    icon: Award,
    title: "Graduation & Certification",
    color: "from-green-light to-primary",
    items: [
      "Completion of all classes",
      "Submission of all assignments",
      "Successful completion of exams",
      "Fulfilment of attendance requirements",
      "Receive an official Digital Certificate of Completion",
    ],
  },
];

const AcademicPoliciesSection = () => {
  const [activeTab, setActiveTab] = useState<"policies" | "grading">("policies");

  return (
    <section id="academics" className="section-padding bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-max relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            <Sparkles size={16} />
            Department of Admissions & Student Affairs
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-foreground mb-4">
            Academic <span className="text-gradient-gold">Excellence</span> Framework
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            Our policies, grading system, and certification standards — built on tradition, refined by structure.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-card border border-border rounded-2xl shadow-md backdrop-blur-sm">
            <button
              onClick={() => setActiveTab("policies")}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === "policies"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ClipboardCheck size={16} className="inline mr-2" />
              Policies
            </button>
            <button
              onClick={() => setActiveTab("grading")}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === "grading"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <GraduationCap size={16} className="inline mr-2" />
              Grading System
            </button>
          </div>
        </div>

        {/* Policies Grid */}
        {activeTab === "policies" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {policySections.map((section, idx) => (
              <div
                key={section.id}
                className="group relative bg-card rounded-2xl border border-border p-6 hover:shadow-2xl hover:border-accent/40 hover:-translate-y-1 transition-all duration-500"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {/* Gradient halo */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} />

                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${section.color} text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <section.icon size={26} />
                </div>

                <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                  {section.title}
                </h3>

                <ul className="space-y-2.5">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                      <CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Grading Table */}
        {activeTab === "grading" && (
          <div className="animate-fade-in">
            <div className="max-w-5xl mx-auto bg-card rounded-3xl border border-border shadow-2xl overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 bg-gradient-to-r from-primary to-green-light text-primary-foreground p-4 sm:p-5 font-heading font-semibold text-sm sm:text-base">
                <div className="col-span-3 sm:col-span-2 text-center">Grade</div>
                <div className="col-span-5 sm:col-span-6 text-center">Classification</div>
                <div className="col-span-2 text-center">Letter</div>
                <div className="col-span-2 text-center">GPA</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-border">
                {gradeData.map((row, idx) => (
                  <div
                    key={row.grade}
                    className={`grid grid-cols-12 items-center p-4 sm:p-5 hover:bg-muted/50 transition-colors bg-gradient-to-r ${row.tone}`}
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div className="col-span-3 sm:col-span-2 text-center font-mono font-bold text-foreground text-sm sm:text-base">
                      {row.grade}
                    </div>
                    <div className="col-span-5 sm:col-span-6 text-center text-foreground font-medium text-sm sm:text-base">
                      {row.classification}
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <span className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${row.letterBg} font-heading font-bold text-base sm:text-lg shadow-md`}>
                        {row.letter}
                      </span>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-blue-200 text-blue-900 font-bold text-sm sm:text-base shadow-sm">
                        {row.gpa}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer note */}
              <div className="bg-muted/40 border-t border-border p-4 text-center text-xs sm:text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Note:</span> Minimum passing score is <span className="font-bold text-primary">60%</span>. Students scoring below this will need to retake the course.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AcademicPoliciesSection;
