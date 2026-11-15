const form = document.querySelector('#filters');
if (form) {
  const q = form.elements.q, part = form.elements.part, subject = form.elements.subject, grade = form.elements.grade;
  const sections = [...document.querySelectorAll('[data-part]')];
  const total = document.querySelectorAll('.lesson-item').length;
  const params = new URLSearchParams(location.search);
  for (const name of ['q','part','subject','grade']) {
    const field = form.elements[name];
    const value = params.get(name) || '';
    if (name === 'q' || [...field.options].some(o=>o.value===value)) field.value = value;
  }
  function update() {
    const words = q.value.trim().normalize('NFKC').toLocaleLowerCase('ko').split(/\s+/).filter(Boolean);
    let count = 0;
    for (const section of sections) {
      let local = 0;
      for (const card of section.querySelectorAll('.lesson-item')) {
        const match = (!part.value || section.dataset.part === part.value) && (!subject.value || card.dataset.subjects.split('|').includes(subject.value)) && (!grade.value || card.dataset.grades.split('|').includes(grade.value)) && words.every(w=>card.dataset.title.includes(w));
        card.hidden = !match;
        if (match) {local++;count++;}
      }
      section.hidden = !!part.value && section.dataset.part !== part.value;
      section.querySelector('.part-empty').hidden = local>0;
      section.querySelector('.lesson-grid').hidden = local===0;
    }
    const filtered = !!(q.value.trim() || part.value || subject.value || grade.value);
    document.querySelector('#results').textContent = filtered ? `전체 ${total}개 중 ${count}개 수업` : `전체 ${total}개 수업`;
    document.querySelector('#no-results').hidden=count>0;
    if (!count) sections.forEach(s=>{s.hidden=true;});
    const next = new URLSearchParams();
    for (const name of ['q','part','subject','grade']) if (form.elements[name].value.trim()) next.set(name,form.elements[name].value.trim());
    try { history.replaceState(null,'',location.pathname+(next.size?'?'+next.toString():'')+location.hash); } catch { /* Filtering still works if URL replacement is unavailable. */ }
  }
  form.addEventListener('input',update);
  form.addEventListener('change',update);
  form.addEventListener('submit',e=>{e.preventDefault();update();});
  form.addEventListener('reset',()=>{setTimeout(update,0);});
  document.querySelector('#clear-filters').addEventListener('click',()=>{form.reset();q.focus();});
  update();
}
