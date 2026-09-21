import React from 'react'

const SERVICES = [
  {
    title: 'Machine Learning & AI',
    tag: 'scikit-learn • Python',
    body:
      'Designing and developing end-to-end ML pipelines, supervised classification, clustering, and predictive systems.',
  },
  {
    title: 'Data Analytics & EDA',
    tag: 'Pandas • NumPy',
    body:
      'Exploratory data analysis, statistical modeling, feature engineering, and extracting actionable data-driven insights.',
  },
  {
    title: 'Interactive Dashboards',
    tag: 'Streamlit • Chart.js',
    body:
      'Building responsive, client-facing analytics dashboards using Streamlit, Python, and modern web interfaces.',
  },
  {
    title: 'Database Systems & SQL',
    tag: 'DBMS • Relational SQL',
    body:
      'Relational database architecture (DBMS), schema design, data normalization, and optimized SQL query engineering.',
  },
]

const SubHeader = () => {
  return (
    <div className='relative md:absolute md:top-[50vh] left-0 md:left-[50%] md:right-8 lg:right-16 md:w-[45vw] z-10 flex flex-col items-start px-5 md:px-0'>
      <div className='w-full text-base sm:text-lg md:text-xl lg:text-2xl flex flex-col gap-3 md:gap-4 leading-relaxed md:leading-snug text-left'>
        <p className='font-medium text-fg'>
          Vaishnavi Sharma is an AI/ML Engineer and Computer Science student building intelligent, real-world machine learning solutions.
        </p>
        <p className='text-fg-muted text-sm sm:text-base md:text-lg'>
          She specializes in predictive modeling, exploratory data analytics, and full-cycle intelligent systems that turn data into impact.
        </p>
      </div>

      <div className='about-inline-services w-full mt-8 md:mt-10'>
        <div className='about-inline-services__head'>
          <span className='about-inline-services__label'>CORE EXPERTISE</span>
        </div>
        <div className='about-inline-services__grid'>
          {SERVICES.map((service) => (
            <article key={service.title} className='about-inline-services__item'>
              <span className='text-[0.68rem] tracking-wider uppercase font-semibold text-accent mb-1'>
                {service.tag}
              </span>
              <h4>{service.title}</h4>
              <p>{service.body}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SubHeader
