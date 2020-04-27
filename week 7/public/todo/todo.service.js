
class ToDo {
  bdomeals = [];
  bdomealsService;

  constructor(bdomealsService) {
    this.bdomealsService = bdomealsService;
  }

  init() {
    this.render();
  }

  _renderListRowItem = (bdomeal) => {
    const listGroupItem = document.createElement('li');
    listGroupItem.id = `bdomeal-${bdomeal.bdomeal_id}`;
    listGroupItem.className = 'list-group-item';

    const deleteBtn = document.createElement('button');
    const deleteBtnTxt = document.createTextNode('X');
    deleteBtn.id = 'delete-btn';
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

    // add list item's details
    listGroupItem.append(deleteBtn);
    listGroupItem.append(bdomealNameSpan);
    listGroupItem.append(bdomealSilverValueSpan);
    listGroupItem.append(bdomealDateSpan);

    return listGroupItem;
  };

  /**
   * DOM renderer for assembling the list items then mounting them to a parent node.
   */
  _renderList = () => {
    // get the "Loading..." text node from parent element
    const bdomealsDiv = document.getElementById('bdomeals');
    const loadingDiv = bdomealsDiv.childNodes[0];
    const fragment = document.createDocumentFragment();
    const ul = document.createElement('ul');
    ul.id = 'bdomeals-list';
    ul.className = 'list-group list-group-flush checked-list-box';

    this.bdomeals.map((bdomeal) => {
      const listGroupRowItem = this._renderListRowItem(bdomeal);

      // add entire list item
      ul.appendChild(listGroupRowItem);
    });

    fragment.appendChild(ul);
    bdomealsDiv.replaceChild(fragment, loadingDiv);
  };

  /**
   * DOM renderer for displaying a default message when a user has an empty list.
   */
  _renderMsg = () => {
    const bdomealsDiv = document.getElementById('bdomeals');
    const loadingDiv = bdomealsDiv.childNodes[0];
    const listParent = document.getElementById('bdomeals-list');
    const msgDiv = this._createMsgElement('Create some new bdo meals!');

    if (bdomealsDiv) {
      bdomealsDiv.replaceChild(msgDiv, loadingDiv);
    } else {
      bdomealsDiv.replaceChild(msgDiv, listParent);
    }
  };

  addBdomeal = async (newBdomeal) => {
    try {
      const { bdomeal_name, silver_value } = newBdomeal;
      await this.bdomealsService.addBdomeal({ bdomeal_name, silver_value }); 
      this.bdomeals.push(newBdomeal); 
    } catch (err) {
      console.log(err);
      alert('Unable to add bdo meal. Please try again later.');
    }
  };

  
  _addBdomealEventHandler = () => {
    const bdomealNameInput = document.getElementById('formInputBdomealName');
    const bdomeal_name = bdomealNameInput.value;

    const bdomealSilverValueInput = document.getElementById('formInputBdomealSilverValue');
    const silver_value = bdomealSilverValueInput.value;
    

    // validation checks
    if (!bdomeal_name) {
      alert('Please enter a bdo meal name.');
      return;
    }

    const bdomeal = { bdomeal_name, silver_value }; 
    const { newBdomeal, newBdomealEl } = this._createNewBdomealEl(bdomeal); 

    this.addBdomeal(newBdomeal);

    const listParent = document.getElementById('bdomeals-list');

    if (listParent) {
      listParent.appendChild(newBdomealEl);
    } else {
      this._renderList();
    }
    bdomealNameInput.value = ''; // clear form text input
    bdomealSilverValueInput.value = '';
  };

  _createNewBdomealEl = (bdomeal) => {
    const bdomeal_id = this.bdomeals.length;
    const created_date = new Date().toISOString();
    const newBdomeal = { ...bdomeal, bdomeal_id, created_date };
    const newBdomealEl = this._renderListRowItem(newBdomeal);

    return { newBdomeal, newBdomealEl };
  };

  deleteBdomeal = async (bdomealId) => {
    try {
      const res = await this.bdomealsService.deleteBdomeal(bdomealId);
      this.bdomeals = this.bdomeals.filter((bdomeal) => bdomeal.bdomeal_id !== bdomealId);

      if (res !== null) {
        alert('Bdo meal deleted successfully!');
      }
      return res;
    } catch (err) {
      alert('Unable to delete bdo meal. Please try again later.');
    }
  };

  _deleteEventHandler = (bdomealId) => () => {
    const bdomeal = document.getElementById(`bdomeal-${bdomealId}`);
    bdomeal.remove();

    this.deleteBdomeal(bdomealId).then(() => {
      if (!this.bdomeals.length) {
        this._renderMsg();
      }
    });
  };

  /**
   * Creates a message div block.
   *
   * @param {string} msg - custom message to display
   */
  _createMsgElement = (msg) => {
    const msgDiv = document.createElement('div');
    const text = document.createTextNode(msg);
    msgDiv.id = 'user-message';
    msgDiv.className = 'center';
    msgDiv.appendChild(text);

    return msgDiv;
  };

  render = async () => {
    const bdomeals = await this.bdomealsService.getBdomeals();

    try {
      if (bdomeals.length) {
        this.bdomeals = bdomeals;
        this._renderList();
      } else {
        this._renderMsg();
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };
}