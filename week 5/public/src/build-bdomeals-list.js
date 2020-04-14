(async () => {
    const bdomeals = await getBdomeals();
    console.log(bdomeals);
  
    if (bdomeals.length) {
      const div = document.getElementById('bdomeals');
      const loadingDiv = div.childNodes[1];
  
      const ul = document.createElement('ul');
  
      // replace 'loading...' with list
      div.replaceChild(ul, loadingDiv); // <- order is important here!
  
      // create the list
      bdomeals.map((bdomeal) => {
        // building blocks
        const li = document.createElement('li');
        li.className = 'bdomeal-item';
        const block = document.createElement('div');
        block.className = 'bdomeal-item-block';
  
        //   content
        const checkboxSpan = document.createElement('span');
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkboxSpan.className = 'bdomeal-checkbox';
        checkboxSpan.appendChild(checkbox);
  
        const nameSpan = document.createElement('span');
        nameSpan.className = 'bdomeal-name';
        nameSpan.innerText = bdomeal.name;
  
        const silver_valueSpan = document.createElement('span');
        silver_valueSpan.className = 'bdomeal-silver_value';
        silver_valueSpan.innerText = bdomeal.silver_value;
  
        const dateSpan = document.createElement('span');
        dateSpan.className = 'bdomeal-date';
        dateSpan.innerText = bdomeal.created_date;
  
        // add list item
        block.appendChild(checkboxSpan);
        block.appendChild(nameSpan);
        block.appendChild(silver_valueSpan);
        block.appendChild(dateSpan);
  
        li.appendChild(block);
        ul.appendChild(li);
      });
    }
  })();