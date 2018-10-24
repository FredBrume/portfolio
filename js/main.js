

//MODEL
let projectModel = {
  currentProject: null,
  projects: [{
      title: 'SchoolApp',
      description: 'This project was developed for easy and quick access to tools, news and information of students by parents, teachers, administrators and lastly of a school,' +
        'eradicating the manual storage and handling of school records while keeping the users in form and notified of every information with the help of a push notification mechanism',
      skills: ['Java', 'Android', 'Php', 'MySql', 'Google Api', 'Gson'],
      imagePath: 'images/school.jpg'
    },
    {
      title: 'BakeAid',
      description: 'This mobile app is a fully-featured app developed to provide walkthroughs of baking recipes. Media loading was handled and the UI was verified and tested using an integrated third party library' +
        'Expresso and a complete UX with home screen widget was provided.',
      skills: ['Java', 'Android'],
      imagePath: 'images/baking.jpg'
    },
    {
      title: 'PopularMovies',
      description: 'This mobile app is a fully-featured app in which users can view and play trailers, read reviews, and' +
        'mark their favorite movies. It also consist of a database and content provider to store and handle your app data.',
      skills: ['Java', 'Android'],
      imagePath: 'images/movie.jpg'
    },
    {
      title: 'My Neighborhood',
      description: 'My Neighborhood is a Udacity project that displays a map of a person surrounding. ' +
        'This map was inspired by my trip to various parts of New york City and my excitement to share ' +
        'some great spots to visit. In this map you will find a couple locations in New york that are worth ' +
        'checking out if you are ever in the area. The map is also interactive in the sense that you can click on ' +
        'a location either from the list or on the map to learn a bit more about that place. I hope you enjoy! ',
      skills: ['Html', 'Css', 'Knockout.js', 'Jquery.js', 'Javascript'],
      imagePath: 'images/neighborhood.png'
    }
  ]
};


//CONTROLLER
let controller = {
  init: function() {
    projectModel.currentProject = projectModel.projects[0];
    view.init();
  },
  getSelectedProject: function() {
    return projectModel.currentProject;
  },

  setSelectedProject: function(project) {
    projectModel.currentProject = project;
  },

  getProjects: function() {
    return projectModel.projects;
  },

  clearProjects: function() {
    projectModel.currentProject = null;
  }

};


//VIEW
let view = {

  init: function() {

    ScrollReveal().reveal('.title')

    view.toggleNav();
    view.openModalByProjectItemClick();
    view.closeModalByCloseIconClick();
    view.stickyNavigation();
    view.toggleAccordion();

    view.scrollToDivOnMenuClick();
    view.initMap();

  },

  renderModalData: function(project) {

    const header = document.querySelector('.modal-header');
    const projectSummary = document.querySelector('.project-summary');
    const projectImage = document.querySelector('.project-image');
    const footer = document.querySelector('.modal-footer');
    const image = document.createElement('img');

    image.src = project.imagePath;
    header.children[1].innerHTML = project.title;
    projectSummary.children[1].innerHTML = project.description;


    project.skills.forEach(function(skill) {

      const skillItemDiv = document.createElement('div');
      const skillCheckBox = document.createElement('input');
      const skillCheckBoxLabel = document.createElement('label');

      skillItemDiv.style.margin = '7px 0';
      skillCheckBox.type = "checkbox";
      skillCheckBox.checked = true;
      skillCheckBox.id = 'skill';

      skillCheckBoxLabel.setAttribute("for", 'skill');
      skillCheckBoxLabel.innerHTML = skill;
      skillCheckBoxLabel.style.margin = '0 5px';

      skillItemDiv.appendChild(skillCheckBox);
      skillItemDiv.appendChild(skillCheckBoxLabel);
      projectSummary.appendChild(skillItemDiv);
      projectImage.appendChild(image);

    });
  },

  stickyNavigation: function() {
    window.addEventListener('scroll', function() {
      const nav = document.querySelector('.nav');
      const navTop = nav.offsetTop;

      if (window.scrollY >= navTop) {
        document.body.classList.add('fixed-nav');
        $('.nav').css('background-color', '#000');
      } else {
        document.body.classList.remove('fixed-nav');
        $('.nav').css('background-color', 'transparent');
      }
    });

  },

  toggleNav: function() {
    const toggleNav = document.querySelector('#toggle');
    const resizeNav = document.querySelector('#resize');

    toggleNav.addEventListener('click', function() {
      this.classList.toggle('on');
      resizeNav.classList.toggle('active');
    });
  },

  toggleAccordion: function() {
    const accordions = document.querySelectorAll('.accordion');
    for (let i = 0; i < accordions.length; ++i) {
      accordions[i].addEventListener('click', function() {
        $(this).next().toggle(function() {
          $(this).animate({
            height: 140
          }, 100).css('opacity', 1);
        });

      });
    }
  },

  initMap: function() {

    map = new google.maps.Map(document.getElementById('map'), {
      center: new google.maps.LatLng(40.7060855, -73.99686429999997),
      // styles: styles,
      mapTypeId: "roadmap",
      zoom: 15
    });
  },

  getScrollSmoothSelector: function(menu) {
    let div;
    return function() {
      switch (menu) {
        case 'About Me':
          div = $('.heading');
          break;
        case 'Portfolio':
          div = $('.portfolio');
          break;
        case 'Contact Me':
          div = $('.contact-heading');
          break;
        default:
      }
      return div;
    }
  },

  scrollToDivOnMenuClick: function() {
    const menuItemsNav = document.querySelectorAll('.nav__item');
    const menuDiv = document.querySelector('#resize');
    const toggleNav = document.querySelector('#toggle');
    const menuItemsDiv = document.querySelector('#menu').children;


    for (let item = 0; item < menuItemsDiv.length; ++item) { //DivMenu
      menuItemsDiv[item].addEventListener('click', function(evt) {
        view.scrollToDiv(menuItemsDiv[item]);
        menuDiv.classList.toggle('active');
        toggleNav.classList.toggle('on');
      });
    }

    menuItemsNav.forEach(function(item) { //NavMenu
      item.addEventListener('click', function(evt) {
        view.scrollToDiv(item);
      });
    });
  },

  scrollToDiv: function(childNode) {
    const scrollDiv = view.getScrollSmoothSelector(childNode.children[0].innerHTML)();
    $('html,body').animate({
        scrollTop: scrollDiv.offset().top
      },
      'slow');
  },

  openModalByProjectItemClick: function() {

    const projectDivList = document.querySelectorAll('.image-box');
    const modal = document.getElementById('myModal');

    for (let item = 0; item < projectDivList.length; item++) {

      projectDivList[item].onclick = function(evt) {

        modal.style.display = 'block';
        let projectItem = this.id;

        controller.getProjects().forEach(function(project) {
          if (project.title == projectItem) {
            controller.setSelectedProject(project);
            view.renderModalData(controller.getSelectedProject());
          }
        });

        //disable body from when modal opens
        evt.preventDefault();
        $('body').css('overflow', 'hidden');
      };

      projectDivList[item].onmouseover = function() {
        this.style.backgroundColor = '#F5F5F5';
      };

      projectDivList[item].onmouseout = function() {
        this.style.backgroundColor = '';
      };
    }
  },

  closeModalByCloseIconClick: function() {

    const modal = document.getElementById('myModal');
    document.querySelectorAll('.close').forEach(function(element) {

      element.onclick = function(evt) {
        modal.style.display = 'none';

        evt.preventDefault();
        $('body').css('overflow', 'auto');

      };
    });

    controller.clearProjects();  //unsubscribe data from currentProject
    console.log("Deeee");
    console.log(projectModel.currentProject);

  },

  clearChildNodes: function(parentNode, childNode) {
    parentNode.removeChild(childNode);
  }
};

window.sr = new ScrollReveal();
sr.reveal('#intro-title', { origin: 'bottom', distance: '20px', duration: 2000, });
sr.reveal('#title', { origin: 'bottom', distance: '20px', duration: 2000, });
sr.reveal('.profile', { origin: 'bottom', distance: '20px', duration: 4000, });
sr.reveal('.summary', { origin: 'bottom', distance: '20px', duration: 4000, });
sr.reveal('.portfolio', { origin: 'bottom', distance: '20px', duration: 4000, });
sr.reveal('.certification', { origin: 'bottom', distance: '20px', duration: 4000, });
sr.reveal('.contact-heading', { origin: 'bottom', distance: '20px', duration: 4000, });
sr.reveal('.contact-details', { origin: 'bottom', distance: '20px', duration: 4000, });



controller.init();
