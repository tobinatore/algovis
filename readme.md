# AlgoVis<span>.</span>io

## Table of Contents <!-- omit in toc -->

- [AlgoVis<span>.</span>io](#algovisio)
  - [General](#general)
    - [Introduction](#introduction)
    - [Setup](#setup)
    - [Algorithms](#algorithms)
    - [Example visualizations](#example-visualizations)
  - [Technical stuff](#technical-stuff)
    - [Behind the visualizations](#behind-the-visualizations)
    - [Documentation](#documentation)
    - [Full list of algorithms and data structures](#full-list-of-algorithms-and-data-structures)
      - [Sorting](#sorting)
      - [Graphs](#graphs)
      - [Pathfinding](#pathfinding)
      - [Maze generation](#maze-generation)
      - [Data structures](#data-structures)
  - [Contributing](#contributing)

## General

### Introduction

AlgoVis<span>.</span>io is an online algorithm visualization tool written using HTML, CSS, JS, jQuery and d3.js.

### Setup

You do not need to download / clone / fork / whatever anything to test the website, as a live version can be found [on my GithubPages portfolio](https://tobinatore.github.io/algovis/)!

If you wish to have a local copy for testing all you need to do is fork and clone the repository. There are no complicated setup steps to get it up and running. You won't need a webserver as I'm not using php or any other server-side languages in this project.

### Algorithms

At the time of writing this readme, I've implemented visualizations for 24 algorithms in 3 categories and 4 data structures.

The 3 categories are:

- sorting
- graphs
- pathfinding and maze generation

A full list of all algorithms can be found under [Full list of algorithms](#Full-list-of-algorithms).

### Example visualizations

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

## Technical stuff

### Behind the visualizations

I've made the visualizations using d3.js. All visualizations are contained in an \<svg> and are essentially just manipulations of svg elements. As this is the first time I've used d3.js, there's probably a lot of room for improvement in my code.

### Documentation

I've written jsDoc comments for every class and module to make it easier to understand what everything does. You can find all auto-generated html files in the `documentation` folder.

### Full list of algorithms and data structures

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

## Contributing

If you've found a bug or want to add an algorithm feel free to fork this repository and open pull requests :).
