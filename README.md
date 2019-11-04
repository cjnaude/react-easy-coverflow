# react-easy-coverflow
A small and easy-to-use coverflow component for React

## Installation
Install via NPM

```js
npm install react-easy-coverflow
```

```js
import CoverFlow from "react-easy-coverflow";
```

## Example

```js
const slides = [
  {
    id: 1,
    image: "/slide1.jpg",
    name: "Slide 1 Title",
    isDisabled: false,
  },
  {
    id: 2,
    image: "/slide2.jpg",
    name: "Slide 2 Title",
    isDisabled: true,
  },
  {
    id: 3,
    image: "/slide3.jpg",
    name: "Slide 3 Title",
    isDisabled: false,
  },
]
return (
  <CoverFlow
    slides={slides}
    selectedSlide={3}
    onSlideSelect={updateSelectedSlides}
  />
);
```

![React-easy-coverflow Example](react-easy-coverflow.gif)

## Coverflow Options

- `slides: Array<Object>`
  - Required
  - `slide Object: Object`
    - `id: int` (Must be unique)
    - `image: filepath`
    - `name: string`
    - `isDisabled: bool` (Disabled slides will be visible, but can not be selected)
- `selectedSlide: int`
  - Required, unless selectedSlides is being used
  - Use the ID of the selected slide
  - Must be set to null if no slides are selected
- `selectedSlides: Array<int>`
  - Optional: can use this instead of selectedSlide to send an array of selected items. Used when the coverflow can have multiple slides selected
  - Use the IDs of the selected slides
  - Use an empty array if no slides are selected

## Coverflow Details

The coverflow can be navigated in 3 ways
- The user can click on the slide which they want to navigate to
- The user can use the navigation buttons which are rendered below the slides
- The user can swipe along the slides ([react-swipeable](https://github.com/dogfessional/react-swipeable) is used to register swipes)

Slides that are offscreen are not rendered.




