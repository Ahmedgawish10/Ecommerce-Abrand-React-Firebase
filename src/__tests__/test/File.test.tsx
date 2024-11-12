// import { render, screen } from '@testing-library/react';
// import Users from "../../components/Test"
// describe('Greeting component', () => {
//     it('renders the greeting message', () => {
//         render(<Users/>);
//         const greetingElement = screen.getByText(/Users/i);
//         expect(greetingElement).toBeInTheDocument();
//     });

  
// });
import { render } from '@testing-library/react';
 import Users from "../../components/Products"

test('checks if the div with class exists in the DOM', () => {
  const { container } = render(<Users />);

  // Use querySelector to check for the div by class
  const divElement = container.querySelector('.hamada');
  
  // Check if the element is in the document
  expect(divElement).toBeInTheDocument();
});
