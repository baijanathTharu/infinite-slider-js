function RotatingSlider(sliderId) {
  this.id = sliderId;
  this.numberOfElements = document.querySelectorAll(`#${sliderId} li`).length;
  this.itemsPos = new Array(this.numberOfElements);

  this.changeElements = () => {
    const elements = document.querySelectorAll(`#${sliderId} li`);
    console.log('itempost: ', this.itemsPos);
    elements.forEach((elm, idx) => {
      const elmIndex = Number.parseInt(elm.dataset.card);
      this.setPositionByCardId(elmIndex, elm);
    });
    // this.setPositionByCardId();
    this.setIndexByCardId();
  };

  this.setIndexByCardId = () => {
    const items = document.querySelectorAll(`#${sliderId} li`);
    const middleItem = Math.ceil(items.length / 2);
    // console.log('middleItem: ', middleItem);
    items.forEach((elm, idx) => {
      const elmId = Number.parseInt(elm.dataset.card);
      if (elmId < middleItem) {
        elm.style.zIndex = elmId;
      } else if (elmId === middleItem) {
        elm.style.zIndex = 20;
      } else if (elmId > middleItem) {
        elm.style.zIndex = items.length + 1 - elmId;
      }
    });
  };

  this.setIndex = (itemPos) => {
    const items = document.querySelectorAll(`#${sliderId} li`);
    const middleItem = Math.ceil(items.length / 2);
    // console.log('middleItem: ', middleItem);
    items.forEach((elm, idx) => {
      if (idx + 1 < middleItem) {
        elm.style.zIndex = idx;
      } else if (idx + 1 === middleItem) {
        elm.style.zIndex = 20;
      } else if (idx + 1 > middleItem) {
        elm.style.zIndex = items.length - idx;
      }
    });
  };

  this.setPositionByCardId = (elmId, elm) => {
    const items = document.querySelectorAll(`#${sliderId} li`);
    const middleItem = Math.ceil(items.length / 2);

    const multiplier = 20;

    if (elmId < middleItem) {
      elm.style.right = 'unset';
      elm.style.left = `-${elmId * multiplier}px`;
      elm.classList.remove('elm-active');
      elm.style.top = '0px';
    } else if (elmId === middleItem) {
      elm.style.left = 'unset';
      elm.style.left = `${elmId * multiplier}px`;
      elm.style.top = '30px';
      elm.classList.add('elm-active');
    } else if (elmId > middleItem) {
      elm.classList.remove('elm-active');
      elm.style.left = 'unset';
      elm.style.right = `-${elmId * multiplier}px`;
      elm.style.top = '0px';
    }
  };

  this.setPosition = () => {
    const items = document.querySelectorAll(`#${sliderId} li`);
    const middleItem = Math.ceil(items.length / 2);

    const multiplier = 20;

    items.forEach((elm, idx) => {
      if (idx + 1 < middleItem) {
        elm.style.left = `-${(idx + 1) * multiplier}px`;
        this.itemsPos[idx] = { left: `-${(idx + 1) * multiplier}px` };
      } else if (idx + 1 === middleItem) {
        elm.style.left = `${(idx + 1) * multiplier}px`;
        elm.style.top = '30px';
        elm.classList.add('elm-active');
        this.itemsPos[idx] = { left: `${(idx + 1) * multiplier}px` };
      } else if (idx + 1 > middleItem) {
        elm.style.right = `-${(idx + 1) * multiplier}px`;
        this.itemsPos[idx] = { right: `-${(idx + 1) * multiplier}px` };
      }
    });
    console.log('sliderPos: ', this.itemsPos);
  };

  this.handleClick = (e, changeElements) => {
    /**
     * we use data-card attribute to loop
     * get the active element
     */
    console.log('elmId: ', e.target.dataset.card);

    const activeElementIndex = document.querySelector(
      `#${sliderId} .elm-active`
    ).dataset.card;
    const clickedElementIndex = e.target.dataset.card;

    const elements = document.querySelectorAll(`#${sliderId} li`);

    if (activeElementIndex < clickedElementIndex) {
      elements.forEach((elm, idx) => {
        // for last item
        if (Number.parseInt(elm.dataset.card) - 1 <= 0) {
          elm.setAttribute(
            'data-card',
            elements.length + 1 - Number.parseInt(elm.dataset.card)
          );
        } else {
          elm.setAttribute('data-card', Number.parseInt(elm.dataset.card) - 1);
        }
      });
      // TODO:: call function to change cards
    } else if (activeElementIndex === clickedElementIndex) {
    } else if (activeElementIndex > clickedElementIndex) {
      elements.forEach((elm, idx) => {
        // for last item
        if (Number.parseInt(elm.dataset.card) > elements.length - 1) {
          elm.setAttribute(
            'data-card',
            elements.length + 1 - Number.parseInt(elm.dataset.card)
          );
        } else {
          elm.setAttribute('data-card', Number.parseInt(elm.dataset.card) + 1);
        }
      });
      // TODO:: call function to change cards
    }
    changeElements();
  };

  this.addClickListener = () => {
    document.querySelectorAll(`#${sliderId} li`).forEach((elm, idx) => {
      elm.addEventListener('click', (e) =>
        this.handleClick(e, this.changeElements)
      );
    });
  };
}

const slider = new RotatingSlider('team-card');
slider.addClickListener();
slider.setIndex();
slider.setPosition();
