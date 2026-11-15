document.querySelector('[data-share]')?.addEventListener('click',async()=>{
  const status=document.querySelector('.share-status');
  try {
    await navigator.clipboard.writeText(location.href.split('#')[0]);
    status.textContent='수업 주소를 복사했습니다.';
  } catch {
    const fallback=document.querySelector('.share-fallback');
    fallback.hidden=false;
    const input=fallback.querySelector('input');input.value=location.href.split('#')[0];input.focus();input.select();
    status.textContent='주소를 선택했습니다. 복사하여 공유해 주세요.';
  }
});
