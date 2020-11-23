import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss']
})
export class ExperiencesComponent implements OnInit {


  public text = {
    platteville:{
      date: 'Sept 2015 - Dec 2019',
      title: 'Bachelor - Software Engineering',
      desc:'My college experience consisted of many software process courses emphasising group work and many math classes. I was two courses away from a math major, however after a month in proof based real analysis I realised it was not worth it and switched my focused to tutoring.',
    },

    plexus:{
      date: 'Feb 2018 - Aug 2018',
      title: 'Functional Test Engineer (Coop)',
      desc: `I worked with a large team of electrical engineers creating test systems for testing hardware products manufactured by Plexus and other clients. My primary project during this time period was writing a software update to an existing test system which tested generator control units for generators inside of helicopters.`,
    },
    nextpoint:{
      date: 'May 2019 - Aug 2019',
      title: 'Software Engineer (Intern)',
      desc: 'I Helped improve and maintain a software application used by law firms to gather, organize, and prep data for trials. The application was written with Ruby on Rails hosted on AWS.'
    },
    tutoring:{
      date: 'Sept 2016 - Dec -2019',
      title: 'Mathematics Tutor',
      desc: 'I primarily tutored calculus II and differential equations, while occationally also tutoring calculus I & III, statistics, linear algebra, and intro to C++. I enjoyed tutoring alot because I really like math and I like working with people. I am very charismatic and generally show alot of enthusiasm for topics I have a passion for. '
    },
    advicent:{
      date: 'Feb 2020 - Current',
      title: 'Front End Software Engineer',
      desc: 'I work on the front end software development team for an unreleased, business facing, new product offering into the high net-worth individual retirement asset management software market. The front end uses Angular as a framework and NgRX Redux as a state management pattern. I am also the mentor to two new hires who are both new to Angular.'
    }
  }

  constructor() { }

  ngOnInit(): void {
  }


}
