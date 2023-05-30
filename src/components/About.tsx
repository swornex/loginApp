const About = () => {
    return (
        <>
            <div className="box-wrapper">
                <p>
                    <h2>Why Todo app?</h2>Let me list some questions that might
                    feel familiar to you.
                </p>
                <ol>
                    <li>
                        Do you feel overwhelmed remembering the work that needs
                        to be done?
                    </li>
                    <li>
                        Do you find yourself struggling to keep up with
                        deadlines?
                    </li>
                    <li>Do you keep forgeting your tasks?</li>
                </ol>
                <p>
                    If your answer was <b>YES</b> to the above questions then
                    you have come to the right place. <br />
                    In this <b>Todo app</b> you can simply: <br /> Go to home
                    page and click the Add Todo button.
                    <br /> Then fill the form providing title of the task,
                    description of the task and the deadline date.
                    <br /> Finally the task you add will be shown in the home
                    page in a table format where you can view, edit and delete
                    the list.
                </p>
                <h2>Lastly, Thank you for using this todo app!</h2>
            </div>
        </>
    );
};

export default About;
