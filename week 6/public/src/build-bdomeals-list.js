class BdomealList {
  bdomeals = [];

  constructor() {}

 createBdomealListParent = () => {
    const ul = document.createElement('ul');
    ul.id = 'bdomeals-list';
    ul.className = 'list-group list-group-flush checked-list-box';
    return ul;
  };

  _deleteEventHandler = (bdomealId) => async () => {
    if (bdomealId) {
      const res = await deleteBdomeal(bdomealId);

      if (res !== null) {
        this.bdomeals = this.bdomeals.filter((bdomeal) => bdomeal.bdomeal_id !== bdomealId);
        const bdomeal = document.getElementById(`bdomeal-${bdomealId}`);
        bdomeal.remove();

        if (!this.bdomeals.length) {
          const div = document.getElementById('bdomeals');
          const loadingDiv = div.childNodes[1];
          const errDiv = this.generateErrorMsg('Create some new bdo meals!');
          div.replaceChild(errDiv, loadingDiv);
        }
      }
    }
  };

  buildBdomealListRowItem = (bdomeal) => {
    const listGroupItem = document.createElement('li');
    listGroupItem.id = `bdomeal-${bdomeal.id}`;
    listGroupItem.className = 'list-group-item';

    const deleteBtn = document.createElement('button');
    const deleteBtnTxt = document.createTextNode('X');
    deleteBtn.className = 'btn btn-secondary';
    deleteBtn.addEventListener('click', this._deleteEventHandler(bdomeal.bdomeal_id));
    deleteBtn.appendChild(deleteBtnTxt);

    const bdomealNameSpan = document.createElement('span');
    const bdomealName = document.createTextNode(bdomeal.bdomeal_name);
    bdomealNameSpan.appendChild(bdomealName);

    const bdomealSilverValueSpan = document.createElement('span');
    const bdomealSilverValue = document.createTextNode(bdomeal.silver_value);
    bdomealSilverValueSpan.append(bdomealSilverValue);

    const bdomealDateSpan = document.createElement('span');
    const bdomealDate = document.createTextNode(bdomeal.created_date);
    bdomealDateSpan.append(bdomealDate);

 
    listGroupItem.append(deleteBtn);
    listGroupItem.append(bdomealNameSpan);
    listGroupItem.append(bdomealSilverValueSpan);
    listGroupItem.append(bdomealDateSpan);

    return listGroupItem;
  };


  buildBdomealsList = (mount, bdomeals) =>
    bdomeals.map((bdomeal) => {
      const listGroupRowItem = this.buildBdomealListRowItem(bdomeal);

  
      mount.append(listGroupRowItem);
    });

  generateErrorMsg = (msg) => {
    const div = document.createElement('div');
    const text = document.createTextNode(msg);
    div.id = 'user-message';
    div.className = 'center';
    div.appendChild(text);
    return div;
  };

  generateBdomeals = async () => {
    const res = await getBdomeals();
    const div = document.getElementById('bdomeals');
    const loadingDiv = div.childNodes[1];

    if (res.length) {
      this.bdomeals = res;
      const bdomealsDiv = this.createBdomealListParent();
      this.buildBdomealsList(bdomealsDiv, res);
      div.replaceChild(bdomealsDiv, loadingDiv);
    } else {
      const errDiv = this.generateErrorMsg(res.msg);
      div.replaceChild(errDiv, loadingDiv);
    }
  };
}

const inst = new BdomealList();


(async () => {
  inst.generateBdomeals();
})();