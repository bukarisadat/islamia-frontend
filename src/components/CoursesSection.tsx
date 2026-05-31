import { useState, useEffect } from "react";
import { Clock, ChevronDown, BookOpen, Heart } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const semesters = [
  {
    name: "Semester 1 (Level One)",
    description: "Building strong Arabic fundamentals from scratch",
    totalHours: "6 hours / week",
    courses: [
      { title: "Arabic Language 1", duration: "2 hrs / week" },
      { title: "Expression & Communication 1", duration: "1 hr / week" },
      { title: "Reading 1", duration: "1 hr / week" },
      { title: "Writing Skills 1", duration: "1 hr / week" },
      { title: "Qur'ān 1", duration: "1/2 hr / week" },
      { title: "Phonetics", duration: "1/2 hr / week" },
    ],
  },
  {
    name: "Semester 2 (Level Two)",
    description: "Deepening understanding of grammar and reading skills",
    totalHours: "7 hours / week",
    courses: [
      { title: "Arabic Language 2", duration: "2 1/2 hrs / week" },
      { title: "Expression & Communication 2", duration: "1 hr / week" },
      { title: "Reading 2", duration: "1 hr / week" },
      { title: "Writing Skills 2", duration: "1 hr / week" },
      { title: "Qur'ān 2", duration: "1/2 hr / week" },
      { title: "Noble Hadeeth 1", duration: "1/2 hr / week" },
      { title: "Jurisprudence 1", duration: "1/2 hr / week" },
    ],
  },
  {
    name: "Semester 3 (Level Three)",
    description: "Advanced studies with Islamic sciences integration",
    totalHours: "9 hours / week",
    courses: [
      { title: "Arabic Language 3", duration: "3 hrs / week" },
      { title: "Expression & Communication 3", duration: "1 hr / week" },
      { title: "Reading 3", duration: "1 hr / week" },
      { title: "Writing Skills 3", duration: "1/2 hr / week" },
      { title: "Qur'ān & Tajweed 1", duration: "1 hr / week" },
      { title: "Noble Hadeeth 2", duration: "1/2 hr / week" },
      { title: "Jurisprudence 2", duration: "1 hr / week" },
      { title: "Biography of the Prophet", duration: "1/2 hr / week" },
      { title: "Monotheism 1", duration: "1/2 hr / week" },
    ],
  },
  {
    name: "Semester 4 (Level Four)",
    description: "Specialization and mastery of Arabic and Islamic sciences",
    totalHours: "10 hours / week",
    courses: [
      { title: "Arabic Language 4", duration: "4 hrs / week" },
      { title: "Expression & Communication 4", duration: "1 hr / week" },
      { title: "Reading 4", duration: "1 hr / week" },
      { title: "Literary Text Analysis Skills", duration: "1 hr / week" },
      { title: "Qur'ān & Tajweed 2", duration: "1 hr / week" },
      { title: "Biography of Rightly Guided Caliphs", duration: "1/2 hr / week" },
      { title: "Monotheism 2", duration: "1/2 hr / week" },
      { title: "Qur'ān Interpretation", duration: "1 hr / week" },
    ],
  },
];

const CoursesSection = () => {
  const [openSemester, setOpenSemester] = useState(0);
  const [likedCourses, setLikedCourses] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("ami_liked_courses") || "[]");
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("ami_liked_courses", JSON.stringify(likedCourses));
  }, [likedCourses]);

  const toggleLike = (title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedCourses.includes(title)) {
      setLikedCourses(likedCourses.filter((c) => c !== title));
      toast.info(`Removed "${title}" from favorites`);
    } else {
      setLikedCourses([...likedCourses, title]);
      toast.success(`Added "${title}" to favorites ❤️`);
    }
  };

  const handleCourseClick = (title: string) => {
    const applyBtn = document.getElementById("apply-now-section");
    if (applyBtn) {
      applyBtn.scrollIntoView({ behavior: "smooth" });
      toast.info(`Interested in "${title}"? Apply now below!`);
    }
  };

  return (
    <section id="courses" className="section-padding bg-muted/50">
      <div className="container-max">
        <div className="text-center mb-14">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Academic Programs</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">Our Curriculum</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive two-year program across four semesters, designed to take you from beginner to mastery in Arabic and Islamic sciences. Upon completion, graduates receive a Certificate in Arabic Language & Islamic Studies.
          </p>
          <p className="text-sm text-foreground/80 max-w-2xl mx-auto mt-3 bg-accent/10 border border-accent/20 rounded-lg px-4 py-2">
            📘 <span className="font-semibold">Course Registration:</span> Students register for their courses each semester after paying the semester fees through the Student Portal.
          </p>
        </div>

        <div className="space-y-4">
          {semesters.map((semester, sIdx) => (
            <div key={semester.name} className="bg-card rounded-xl border border-border overflow-hidden">
              <button
                onClick={() => setOpenSemester(openSemester === sIdx ? -1 : sIdx)}
                className="w-full flex items-center justify-between p-5 sm:p-6 hover:bg-muted/50 transition-colors text-left"
              >
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground">{semester.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{semester.description}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                  <span className="hidden sm:inline-block text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {semester.courses.length} Courses
                  </span>
                  <span className="hidden md:inline-block text-xs font-semibold bg-accent/10 text-accent px-3 py-1 rounded-full">
                    {semester.totalHours}
                  </span>
                  <ChevronDown
                    size={22}
                    className={`text-muted-foreground transition-transform ${openSemester === sIdx ? "rotate-180" : ""}`}
                  />
                </div>
              </button>

              {openSemester === sIdx && (
                <div className="border-t border-border p-4 sm:p-6 animate-slide-down">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {semester.courses.map((course) => {
                      const isLiked = likedCourses.includes(course.title);
                      return (
                        <div
                          key={course.title}
                          onClick={() => handleCourseClick(course.title)}
                          className="flex items-center gap-3 bg-background rounded-lg border border-border p-4 hover:shadow-md hover:border-accent/30 transition-all duration-300 group cursor-pointer"
                        >
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <BookOpen size={18} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors truncate">
                              {course.title}
                            </h4>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                              <Clock size={10} />{course.duration}
                            </span>
                          </div>
                          <button
                            onClick={(e) => toggleLike(course.title, e)}
                            className={`p-1.5 rounded-full transition-all flex-shrink-0 ${
                              isLiked
                                ? "text-red-500 hover:text-red-400"
                                : "text-muted-foreground hover:text-red-500"
                            }`}
                            title={isLiked ? "Remove from favorites" : "Add to favorites"}
                          >
                            <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
