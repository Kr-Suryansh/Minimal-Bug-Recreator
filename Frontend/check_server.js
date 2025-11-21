(async ()=>{
  try{
    const root = await (await fetch('http://localhost:5173/')).text();
    console.log('--- ROOT HTML (first 800 chars) ---');
    console.log(root.slice(0,800));
    console.log('\n--- /src/main.jsx (first 800 chars) ---');
    const main = await (await fetch('http://localhost:5173/src/main.jsx')).text();
    console.log(main.slice(0,800));
  }catch(e){
    console.error('Fetch failed:', e);
    process.exit(1);
  }
})();