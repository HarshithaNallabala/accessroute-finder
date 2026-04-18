import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Users, Target, Heart, GraduationCap } from "lucide-react";

const team = [
  { name: "N. Harshitha", roll: "R210334" },
  { name: "D. Lathika Reddy", roll: "R211100" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              About <span className="text-gradient">AccessRoute</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              An academic prototype demonstrating how digital systems can enhance
              inclusivity and independence for disabled individuals.
            </p>
          </motion.div>

          {/* Mission cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {[
              { icon: Target, title: "Our Mission", desc: "To promote inclusive navigation by providing safe and accessible route recommendations for disabled individuals." },
              { icon: Heart, title: "Why It Matters", desc: "Conventional navigation systems don't consider accessibility, leaving wheelchair users to encounter stairs, uneven paths, and barriers." },
              { icon: Users, title: "Who It Helps", desc: "Wheelchair users, physically challenged individuals, and anyone who needs barrier-free navigation to move independently." },
              { icon: GraduationCap, title: "Academic Project", desc: "Developed at RGUKT RK Valley, Department of Computer Science and Engineering, under the guidance of V. Sravani." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border shadow-card"
              >
                <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Our Team</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {team.map((member) => (
                <div
                  key={member.roll}
                  className="px-8 py-6 rounded-2xl bg-card border border-border shadow-card text-center"
                >
                  <div className="w-14 h-14 rounded-full gradient-hero flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary-foreground font-display font-bold text-lg">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <p className="font-display font-semibold text-foreground">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.roll}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Under the guidance of <strong className="text-foreground">V. Sravani</strong>, CSE Department, RGUKT RK Valley
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
