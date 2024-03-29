import React from "react";
import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, debug, prettyDom, getByDisplayValue } from "@testing-library/react";
import Application from "components/Application";
import axios from "axios";


afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
  
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });
  
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async() => {

    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Add" button on the first empty appointment.
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));

    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: "Lydia Miller-Jones"}
    });

    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async() => {
     // 1. Render the Application.
     const { container, debug } = render(<Application />);

     // 2. Wait until the text "Archie Cohen" is displayed.
     await waitForElement(() => getByText(container, "Archie Cohen"));
 
     // 3. Click the "Delete" button on the booked appointment card.
     const appointment = getAllByTestId(container, "appointment").find(appointment =>
       queryByText(appointment, "Archie Cohen")
      );
      
     fireEvent.click(getByAltText(appointment, "Delete"));
     
     // 4. Check that the confirmation message is shown.
     expect(getByText(appointment,"Are you sure you want to delete?")).toBeInTheDocument();

     // 5. Click the "Confirm" button in the confirmation message.
     fireEvent.click(queryByText(appointment, "Confirm"));
   
     // 6. Check that the element with the text "Deleting" is displayed.
     expect(getByText(appointment, "Deleting")).toBeInTheDocument();
  
     // 7. Wait until the element with the "Add" button is displayed.
     await waitForElement(() => getByAltText(appointment, "Add"));

     // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
     const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
     );
     expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async() => {
     // 1. Render the Application.
     const { container, debug } = render(<Application />);

     // 2. Wait until the text "Archie Cohen" is displayed.
     await waitForElement(() => getByText(container, "Archie Cohen"));
 
     // 3. Click the "Edit" button on the booked appointment card.
     const appointment = getAllByTestId(container, "appointment").find(appointment =>
      queryByText(appointment, "Archie Cohen")
     );
     fireEvent.click(getByAltText(appointment, "Edit"));

     // 4. Change the name of the student for "Archie Cohen Cohen".
     fireEvent.change(getByDisplayValue(appointment, "Archie Cohen"), {
      target: {value: "Archie Cohen Cohen"}
     });

     // 5. Click the "Save" button in the form.
     fireEvent.click(queryByText(appointment, "Save"));

     // 6. Check that the element with the text "Saving" is displayed.
     expect(getByText(appointment, "Saving")).toBeInTheDocument();

     // 7. Wait until the element with the text "Archie Cohen Cohen" is displayed.
     await waitForElement(() => getByText(appointment, "Archie Cohen Cohen"));

     // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
     const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
     );
     expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async() => {
    // 0. Block API call
    axios.put.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment card.
    const appointment = getAllByTestId(container, "appointment").find(appointment =>
     queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Edit"));

    // 4. Change the name of the student for "Archie Cohen Cohen".
    fireEvent.change(getByDisplayValue(appointment, "Archie Cohen"), {
     target: {value: "Archie Cohen Cohen"}
    });
    
    // 5. Click the "Save" button in the form.
    fireEvent.click(queryByText(appointment, "Save"));
    
    // 6. The save error message is displayed.
    await waitForElement(() => getByText(appointment, "Sorry, cannot save this appointment."));

    // 7. Click the close button of the message.
    fireEvent.click(getByAltText(appointment, "Close"));

    // 8. The form should be displayed.
    expect(getByDisplayValue(appointment, "Archie Cohen")).toBeInTheDocument();
    
  });
  
  it("shows the delete error when failing to delete an existing appointment", async() => {
    // 0. Block API call
    axios.delete.mockRejectedValueOnce();
        
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
        
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    // 3. Click the "Delete" button on the booked appointment card.
    const appointment = getAllByTestId(container, "appointment").find(appointment =>
     queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Delete"));
        
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment,"Are you sure you want to delete?")).toBeInTheDocument();

    // 5. Click the "Confirm" button in the confirmation message.
    fireEvent.click(queryByText(appointment, "Confirm"));
        
    // 6. The delete error message is displayed.
    await waitForElement(() => getByText(appointment, "Sorry, cannot delete this appointment."));
        
    // 7. Click the close button of the message.
    fireEvent.click(getByAltText(appointment, "Close"));

    // 8. The form should be displayed.
    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
    
  });

});


