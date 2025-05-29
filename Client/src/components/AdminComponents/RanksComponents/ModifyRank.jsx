import { useCallback, useState, useMemo, memo } from 'react';
import useCreateRank from '../../../hooks/AdminHooks/useCreateRank.jsx';

const options = [
  "Educational Attainment",
  "Bachelor's Degree",
  "Bachelor's Law",
  "Master's Degree",
  "Doctorate Degree",
  "Post-baccalaureate Degree",
  "Post Graduate Diploma",
  "Allied",
  "Aligned",
  "Graduate",
  'OTE (Overall Teaching Effectiveness)',
  'New Faculty: At least 80',
	'New Faculty: At least 85',
	'New Faculty: At least 90',
  "On-board Faculty",
  'OTE: At least 5', 
  'OTE: At least 6', 
  'SPES: At least 4', 
  'SPES: At least 5', 
  'SPES: At least 6', 
  "Training",
  "Seminar Attendance",
  "Seminar Speakership",
  'Workshop Speakership',
  "Conference Attendance",
  "TESDA Graduate",
  "TESDA Certified",
  "TESDA Teaching Experience",
  "Teaching Experience",
  "Relevant Industry",
  "Work Experience",
  "Middle management",
  "Top management",
  "Works",
  "Q1 Publications",
  "Creative Work",
  "College Work",
  "Institutional Work",
  "Professional Work",
  "Scientific Work",
  "Scopus/ISI",
  "Diplomate",
  "Fellow",
  "Licenses",
  "PRC accredited",
  'PRC License',
  "Dental Specialty",
  "Optometry Specialty",
  "Medical Specialty",
  "Dental Hygienist",
  "Dental Technologist",

  "Community Service",
  "Leadership Position",
  "Membership",
  "Externally funded project",
  "Commercialization/Start-up project",
  "Approved",
  "On-going",
  "Technical Innovation",
];

const ModifyRank = () => {
  const { createRank } = useCreateRank();

  const [ isSubmitted, setIsSubmitted ] = useState(false);

  const [ data, setData ] = useState({ rankName: '', track: '' });
  const [ requirementData, setRequirementData ] = useState([
    {
      requirementNumber: 1,
      description: '',
      requiredDocument: [{ tags: [], metrics: '', minRequirement: '' }],
    }
  ]);

  const handleRequirementChange = (index, e) => {
    const updated = [...requirementData];
    updated[index][e.target.name] = e.target.value;
    setRequirementData(updated);
  };

  const addRequirement = useCallback(() => {
    setRequirementData(prev => [
      ...prev,
      {
        requirementNumber: prev.length + 1,
        description: '',
        requiredDocument: [{ tags: [], metrics: '', minRequirement: '' }],
      },
    ]);
  }, []);

  const deleteRequirement = useCallback((index) => {
    setRequirementData(prev =>
      prev
        .filter((_, i) => i !== index)
        .map((req, i) => ({ ...req, requirementNumber: i + 1 }))
    );
  }, []);

  //Multi select functions
  const updateRequiredDocument = useCallback((index, docIndex, field, value) => {
    setRequirementData(prev => {
      const updated = [...prev];
      updated[index].requiredDocument[docIndex][field] = value;
      return [...updated];
    });
  }, []);

  const addRequiredDocument = useCallback((index) => {
    setRequirementData(prev => {
      const updated = [...prev];
      updated[index].requiredDocument.push({ tags: [], metrics: '', minRequirement: '' });
      return updated;
    });
  }, []);

  const deleteRequiredDocument = useCallback((index, subIndex) => {
    setRequirementData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, requiredDocument: item.requiredDocument.filter((_, j) => j !== subIndex) } : item
      )
    );
  }, []);

  const handleCreateRank = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    await createRank(data.rankName, data.track, requirementData, setIsSubmitted);
  };

  return (
    <div>
      <form onSubmit={handleCreateRank} className="space-y-5 text-sm">
        <div className="space-y-2">
          <input
            type="text"
            placeholder='Rank name'
            className='w-full fileInput'
            value={data.rankName}
            onChange={(e) => setData({ ...data, rankName: e.target.value })}
          />

          <select
            className='w-full fileInput'
            value={data.track}
            onChange={(e) => setData({ ...data, track: e.target.value })}
          >
            <option value="">Select Track</option>
            <option value="Academic Track">Academic Track</option>
            <option value="Industry Practitioner Track">Industry Practitioner Track</option>
          </select>

          {requirementData.map((req, index) => (
            <div key={index}>
              <div className="flex justify-between">
                <h1 className='text-lg font-semibold'>Requirement {index + 1}</h1>
                <button type="button" className='px-2 py-1 text-sm text-white bg-red-400 rounded-md' onClick={() => deleteRequirement(index)}>
                  Delete
                </button>
              </div>

              <textarea
                name="description"
                className='fileInput'
                placeholder='Requirement description'
                value={req.description}
                onChange={(e) => handleRequirementChange(index, e)}
              />

              <MultiSelect
                requiredDocument={req.requiredDocument}
                updateRequiredDocument={(docIndex, field, value) => updateRequiredDocument(index, docIndex, field, value)}
                options={options}
                addNewRequiredDocument={() => addRequiredDocument(index)}
                deleteRequiredDocument={(docIndex) => deleteRequiredDocument(index, docIndex)}
              />
            </div>
          ))}
        </div>

        <button type='button' onClick={addRequirement}>Add Requirement</button>
        <input type="submit" value="Create Rank" />
      </form>
    </div>
  )
}

export default ModifyRank

const MultiSelect = memo(({ requiredDocument, updateRequiredDocument, options, addNewRequiredDocument, deleteRequiredDocument }) => {
  const [ openIndex, setOpenIndex ] = useState(null)
  const [ search, setSearch ] = useState("");

  const filteredOptions = useMemo(() =>
    options.filter((opt) => opt.toLowerCase().includes(search.toLowerCase())),
    [options, search]
  );

  const toggleTag = (index, tag) => {
    const newData = requiredDocument[index].tags.includes(tag)
      ? requiredDocument[index].tags.filter((item) => item !== tag)
      : [...requiredDocument[index].tags, tag];

    updateRequiredDocument(index, 'tags', newData)
    setSearch('');
  };

  const handleFieldChange = (index, field, e) => {
    const value = e.target.value;
    const numeric = ['metrics', 'minRequirement'].includes(field);
    if (numeric && value && !/^\d*$/.test(value)) return;
    updateRequiredDocument(index, field, value);
  };

  return (
    <div>
      {requiredDocument.map((doc, index) => (
        <div key={index}>
          {requiredDocument.length > 1 && (
            <button type="button" className='px-2 py-1 text-sm text-white bg-red-400 rounded-md' onClick={() => deleteRequiredDocument(index)}>
              Delete
            </button>
          )}

          <div className='relative'>
            <div className="min-h-[44px] border border-gray-300 rounded-md p-2 flex flex-wrap gap-2" onClick={() => setOpenIndex(prev => (prev === index ? null : index))}>
              {doc.tags.map((tag) => (
                <div key={tag} className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-200 rounded-md">
                  {tag}
                  <button type='button' onClick={(e) => { e.stopPropagation(), toggleTag(index, tag) }} >
                    &times;
                  </button>
                </div>
              ))}

              <input
                type="text"
                className="flex-1 text-sm bg-transparent border-none outline-none"
                placeholder="Search or select..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setOpenIndex(prev => (prev === index ? null : index))}
              />
            </div>

            {openIndex === index && (
              <div className="absolute left-0 z-10 w-full mt-2 overflow-y-auto bg-white border border-gray-300 shadow-lg top-full rounded-xl max-h-60">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      <input
                        type="checkbox"
                        className="rounded form-checkbox"
                        checked={doc.tags.includes(option)}
                        onChange={() => toggleTag(index, option) }
                      />
                      {option}
                    </label>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sm text-gray-500">No options found</div>
                )}
              </div>
            )}
          </div>

          <input
            type="text"
            name="metrics"
            className="w-full fileInput"
            placeholder="Years of experience, Units"
            value={doc.metrics}
            onChange={(e) => handleFieldChange(index, 'metrics', e)}
            maxLength="3"
          />

          <input
            type="text"
            name="minRequirement"
            className="w-full fileInput"
            placeholder="Minimum requirement"
            value={doc.minRequirement}
            onChange={(e) => handleFieldChange(index, 'minRequirement', e)}
            maxLength="3"
            required
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addNewRequiredDocument}>
        Add Requirement
      </button>
    </div>
  );
});





