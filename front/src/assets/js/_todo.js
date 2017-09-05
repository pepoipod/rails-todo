export default class Todo {
  constructor() {
    this.$ele = {
      taskList: $('.tasks'),
      categoryList: $('.category-list'),
      popupMenu: $('.popup-menu'),
      taskInfo: $('.task-info'),
      sortData: $('.sort-data')
    };

    this.sortData = {
      by: 'created_at',
      order: 'desc'
    };

    this.editingTitle = {
      task: '',
      category: ''
    };

    this.currentMenu = '';
    this.init();
  }

  init() {
    this.addEvent();
  }

  addEvent() {
    // input title

    $('.task-info .header input').on({
      'focus': (e) => {
        this.editingTitle.task = $(e.target).val();
      },
      'blur': (e) => {
        this.updateTaskTitle($(e.target).val());
      }
    });

    $('.sec-todo-list h1 input').on({
      'focus': (e) => {
        this.editingTitle.category = $(e.target).val();
      },
      'blur': (e) => {
        this.updateCategoryTitle($(e.target).val());
      }
    });

    // tasks.

    this.$ele.taskList.on('click', 'li:not(.add-task)', (e) => {
      if (!$(e.target).closest('i').length) {
        this.openTaskInfo($(e.target).closest('li'));
      }
    });

    $('.tasks li:not(.add-task) > div > i').on('click', (e) => {
      this.toggleComplete($(e.target).closest('li'));
    });

    $('.add-task input').on('blur', () => {
      this.addTask();
    });

    $('.task-info .favorite').on('click', () => {
      this.toggleFavorite();
    });

    $('.task-info .trash').on('click', () => {
      this.removeTask();
    });

    // category

    $('.category-list li:not(.add-category)').on('click', (e) => {
      this.openCategory($(e.target).closest('li'));
    });

    $('.add-category').on('click', () => {
      this.addCategory();
    });


    // popupMenu.

    $('.sec-todo-list nav > .sort').on('click', () => {
      this.openNav('.sort');
    });

    $('.sec-todo-list nav > .other').on('click', () => {
      this.openNav('.other');
    });

    $('.popup-menu .other .trash').on('click', () => {
      this.removeCategory();
    });


    // sort

    $('.popup-menu .sort li').on('click', (e) => {
      this.setSort($(e.target).closest('li'));
    });

    $('.sort-data .type').on('click', () => {
      this.toggleSortType();
    });

    $('.sort-data .close').on('click', () => {
      this.disableSort();
    });
  }

  openTaskInfo($task) {
    // 既に開いているタスクと同じものを選択した場合、task-infoを閉じる.
    const openedTask = $('.tasks li.open').get(0);
    this.closeTaskInfo();

    if (openedTask === $task.get(0)) {
      return;
    }

    $task.toggleClass('open');

    if ($task.hasClass('open')) {
      this.setTaskInfo($task);
      this.$ele.taskInfo.show();
    } else {
      this.$ele.taskInfo.hide();
    }
  }

  addTask() {
    if (!$('.add-task input').val()) {
      return;
    }

    $('.add-task').before(
      '<li><div>' +
      '<i class="fa-li fa fa-square-o"></i>' +
      '<span>' + $('.add-task input').val() + '</span>' +
      '</div></li>'
    );

    $('.add-task input').val('');
  }

  removeTask() {
    const $task = $('.tasks li.open');
    const isDelete = confirm('「' + $task.find('span').text() + '」を削除しますか？');

    if (isDelete) {
      $task.remove();
      this.$ele.taskInfo.hide();
    }
  }

  closeTaskInfo() {
    $('.tasks li').removeClass('open');
    this.$ele.taskInfo.hide();
  }

  setTaskInfo($task) {
    this.$ele.taskInfo.find('.header input').val($task.find('span').text());
  }

  updateTaskTitle(newTitle) {
    $('.tasks li.open span').text(newTitle);
  }

  toggleComplete($task) {
    const checkBox = $task.find('i.fa');

    $task.toggleClass('complete');
    checkBox.removeClass('fa-check-square fa-square-o');

    if ($task.hasClass('complete')) {
      checkBox.addClass('fa-check-square');
    } else {
      checkBox.addClass('fa-square-o');
    }
  }

  toggleFavorite() {
    const $favorite = $('.task-info .favorite');
    const $icon = $favorite.find('i');
    const $text = $favorite.find('span');

    if ($icon.hasClass('fa-star-o')) {
      $icon.removeClass('fa-star-o').addClass('fa-star');
      $text.text('お気に入りを解除');
    } else {
      $icon.removeClass('fa-star').addClass('fa-star-o');
      $text.text('お気に入りに追加');
    }
  }

  openCategory($category) {
    $('.category-list li').removeClass('open');
    $category.addClass('open');

    $('.sec-todo-list h1 input').val($category.find('span').text());
  }

  updateCategoryTitle(newTitle) {
    $('.category-list li.open span').text(newTitle);
  }

  addCategory() {
    const $titleInput = $('.sec-todo-list h1 input');
    $('.category-list li').removeClass('open');
    $('.add-category').before(
      '<li class="open"><div>' +
      '<i class="fa-li fa fa-tasks"></i>' +
      '<span></span>' +
      '</div></li>'
    );

    $titleInput.val('');
    $titleInput.focus();
  }

  removeCategory() {
    confirm('カテゴリ「' +　$('.category-list li.open span').text() + '」を削除しますか？');
  }

  openNav(target) {
    if (this.currentMenu === target) {
      this.$ele.popupMenu.hide();
      this.currentMenu = '';

      return;
    }

    this.$ele.popupMenu.show();
    this.currentMenu = target;

    switch (target) {
      case '.sort':
        this.$ele.popupMenu.find('h2').text('並べ替え');

        this.$ele.popupMenu.find('ul').hide();
        this.$ele.popupMenu.find(target).show();
        break;
      case '.other':
        this.$ele.popupMenu.find('h2').text('カテゴリメニュー');

        this.$ele.popupMenu.find('ul').hide();
        this.$ele.popupMenu.find(target).show();
        break;
      default:
        break;
    }
  }

  setSort($clicked) {
    this.$ele.sortData.show();
    this.$ele.sortData.find('.info').text($clicked.find('span').text() + 'に並べ替え済み');
  }

  toggleSortType() {
    $('.sort-data .type i').removeClass('fa-angle-down fa-angle-up');

    if (this.sortData.order === 'desc') {
      this.sortData.order = 'asc';
      $('.sort-data .type i').addClass('fa-angle-up');
    } else {
      this.sortData.order = 'desc';
      $('.sort-data .type i').addClass('fa-angle-down');
    }
  }

  disableSort() {
    this.$ele.sortData.hide();
  }
}
