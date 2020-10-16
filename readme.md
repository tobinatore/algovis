<h1 align="center"> 
 <img src="https://i.imgur.com/afQhzn9.png"> <br>
AlgoVis<span>.</span>io
</h1>
<h4 align="center">AlgoVis is a passion project aimed at helping everybody understand algorithms a little better by using easy to understand visualizations, concise explanations and dynamic code highlighting showing exactly what's happening.</h4>
<p align="center"><img src="https://img.shields.io/website?down_color=%23CC1616&down_message=offline&up_message=live&url=https%3A%2F%2Ftobinatore.github.io%2Falgovis%2F"> <img src="https://img.shields.io/github/v/release/tobinatore/algovis?color=%23CC1616"> <img src="https://img.shields.io/github/last-commit/tobinatore/algovis?color=%23CC1616"> <img src="https://img.shields.io/github/repo-size/tobinatore/algovis?color=%23CC1616"> <img src="https://img.shields.io/codeclimate/maintainability/tobinatore/algovis"> </p>

## :bookmark_tabs: Table of Contents <!-- omit in toc -->

- [:v: General](#v-general)
  - [:wave: Introduction](#wave-introduction)
  - [:desktop_computer: Setup](#desktop_computer-setup)
  - [:chart_with_upwards_trend: Algorithms](#chart_with_upwards_trend-algorithms)
  - [:eyes: Example visualizations](#eyes-example-visualizations)
- [:technologist: Technical stuff](#technologist-technical-stuff)
  - [:rocket: Behind the visualizations](#rocket-behind-the-visualizations)
  - [:book: Documentation](#book-documentation)
  - [:ballot_box_with_check: Full list of algorithms and data structures](#ballot_box_with_check-full-list-of-algorithms-and-data-structures)
    - [Sorting](#sorting)
    - [Graphs](#graphs)
    - [Pathfinding](#pathfinding)
    - [Maze generation](#maze-generation)
    - [Data structures](#data-structures)
- [:memo: Contributing](#memo-contributing)

## :v: General

### :wave: Introduction

AlgoVis<span>.</span>io is an online algorithm visualization tool written using HTML, CSS, JS, jQuery and d3.js.

### :desktop_computer: Setup

You do not need to download / clone / fork / whatever anything to test the website, as a live version can be found [on my GithubPages portfolio](https://tobinatore.github.io/algovis/)!

If you wish to have a local copy for testing all you need to do is either fork and clone the repository if you want to contribute or download one of the releases found [here](https://github.com/tobinatore/algovis/releases) if you just want to play around with it. There are no complicated setup steps to get it up and running. You won't need a webserver as I'm not using php or any other server-side languages in this project.

### :chart_with_upwards_trend: Algorithms

At the time of writing this readme, I've implemented visualizations for 24 algorithms in 3 categories and 4 data structures.

The 3 categories are:

- sorting
- graphs
- pathfinding and maze generation

A full list of all algorithms can be found under [Full list of algorithms](#Full-list-of-algorithms).

### :eyes: Example visualizations

Selection sort:  
![Selection sort](https://i.imgur.com/gQMfbjx.gif)

Kruskal's algorithm:  
![Kruskal' algorithm](https://i.imgur.com/kuGmsbF.gif)

Dijkstra's algorithm:  
![Diijkstra's algorithm](https://i.imgur.com/beyCCsQ.gif)

Growing tree algorithm:  
![Growing tree algorithm](https://i.imgur.com/cDm39b6.gif)

Stack:  
![Stack](https://i.imgur.com/HV21dvo.gif)

## :technologist: Technical stuff

### :rocket: Behind the visualizations

I've made the visualizations using d3.js. All visualizations are contained in an \<svg> and are essentially just manipulations of svg elements. As this is the first time I've used d3.js, there's probably a lot of room for improvement in my code.

### :book: Documentation

I've written jsDoc comments for every class and module to make it easier to understand what everything does. You can find all auto-generated html files in the `documentation` folder.

### :ballot_box_with_check: Full list of algorithms and data structures

#### Sorting

- Bogosort
- Bubblesort
- Cocktail shaker sort
- Combsort
- Counting sort
- Gnomesort
- Insertion sort
- Quicksort
- Radix sort
- Selection sort

#### Graphs

- Breadth-first search
- Depth-first search
- Kosaraju's algorithm
- Kruskal's algorithm
- Prim's algorithm
- Tarjan's algorithm

#### Pathfinding

- A\* algorithm
- Breadth-first search
- Depth-first search
- Dijkstra's algorithm

#### Maze generation

- Recursive DFS
- Growing tree algorithm
- Binary tree algorithm
- Sidewinder algorithm

#### Data structures

- Doubly linked list
- Hash table
- Linked list
- Stack

## :memo: Contributing

If you've found a bug or want to add an algorithm feel free to fork this repository and open pull requests :).
