const Instruction = () => {
  return (
    <div className=''>
      <p className='mt-6 mb-3 text-sm font-medium tracking-widest text-NuLightText'>FACULTY RANKINGS SYSTEM TRACKS:</p>
      <div className="max-sm:text-sm">
        <p>A. <span className='font-semibold text-NuButton'>Academic Track</span> - A faculty is assigned to this track under the following conditions:</p>
        <ul className='ml-8 max-sm:ml-2'>
            <li>- a faculty is employed full-time at NU.</li>
            <li>- a part-time (PT) faculty with previous and or/current full-or-part-time work on teaching.</li>
            <li>- a part-time (PT) faulty without teaching industry work experience or licensure eligibility.</li>
        </ul>
        <p className='mt-4'>B. <span className='font-semibold text-NuButton'>Industry Practitioner Track</span> - A faculty may be assigned to this track if he or she is a full-time industry practitioner and is employed.</p>
      </div>
    </div>
  )
}

export default Instruction
