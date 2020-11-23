import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public text = {
    aboutMe:{
      p1: `My beginning in software began with some helpful advice from my older brother. “You should go into software because I think you would be a good fit”. So, I decided to enroll in UW-Platteville’s software engineering program without writing a single line of code previously. Right away in my first C++ course, I knew software was the place for me to be. I fell in love with the logical and abstract thinking necessary to understand and create quality software.`,
      p2: `I began tutoring Calculus II Sophomore year after learning about it through a friend and quickly realized that the ability to explain a complex idea in a simple way was incredibly difficult to achieve. I was motivated by seeing the lightbulb go off in the discouraged students that I tutored when they finally understood a difficult concept that they were unable to grasp in lecture. By the end of my college career I was tutoring nearly every major math class required for engineers such as Differential equations and Statistics, as well as lower level classes if needed. I left the Platteville tutoring department with a “roadmap” of the sequences and series portion of Calculus II, the section notorious for ending the engineering careers of many students. I figured out a simple way to explain every part of that course, and the success of my students showed it.`,
      p3: `This idea that complexity can be simply explained was reinforced when I stumbled upon the world of generative art. Through the information treasure trove that is YouTube, I learned of algorithms (usually from the channel Numberphile), that were able to create incredible complexity using simple rules. After learning JavaScript through a React Native course my Junior year, I started experimenting with these algorithms myself with the simplistic graphics library known as P5JS. I fell in love with expanding and generalizing these algorithms to create stunning mathematical art. To this day, the largest portion of my free time is spent creating generative art programs to show the world the true beauty of math.`
    } 
  }

  constructor() { }

  ngOnInit(): void {
  }

}
