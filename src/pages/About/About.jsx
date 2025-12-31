import marcPortrait from "../../assets/images/Marc Delacruz.jpg";

export default function About() {
  return (
    <>
      <section id="about" className="py-16 md:py-32  text-white bg-[#04081A]">
        <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
          <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl text-white">
            Developer, Designer, Creator, Innovator
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
            <div className="relative mb-6 sm:mb-0">
              <div className="bg-linear-to-b aspect-76/59 relative rounded-2xl p-px from-zinc-300 to-transparent">
                <img
                  src={marcPortrait}
                  className="rounded-[15px] shadow block h-full w-full object-cover"
                  alt="Portrait of Marc Delacruz"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="relative space-y-4 self-center">
              <p className="text-white">
                Hello! I'm Marc Delacruz, a Computer Science student focused on
                building thoughtful, reliable web experiences. I care about clean
                architecture, clear interfaces, and solutions that make it easier
                for people to get things done.
              </p>
              <p className="text-white">
                I am expanding my full-stack capabilities while strengthening my
                grounding in front-end engineering. My goal is to design and ship
                performant, accessible applications that pair strong user experience
                with dependable delivery.
              </p>

              <div className="pt-6">
                <blockquote className="border-l-4 border-gray-300 pl-4">
                  <p className="text-white">
                    I'm a lifelong learner who values collaboration and clear
                    problem-solving. I enjoy refining systems, improving workflows,
                    and working with teams to create software that feels polished and
                    purposeful.
                  </p>

                  <div className="mt-6 space-y-3">
                    <cite className="block font-medium text-white">
                      Marc Delacruz
                    </cite>
                  </div>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
