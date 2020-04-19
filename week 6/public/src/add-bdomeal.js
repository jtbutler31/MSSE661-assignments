const doAddBdomeal = async (e) => {
    e.preventDefault();
  
    const bdomealInput = document.getElementById('formInputBdomealName');
    const bdomeal_name = bdomealInput.value;
    const bdomealInput2 =  document.getElementById('formInputBdomealSilverValue');
    const silver_value = bdomealInput2.value;
  
    if (!bdomeal_name) {
      alert('Please enter a bdomeal name.');
      return;
    }
  
    const res = await addBdomeal({ bdomeal_name, silver_value });
  
    if (res !== null) {
      inst.generateBdomeals();
    }
    bdomealInput.value = '';
    bdomealInput2.value = '';
  };