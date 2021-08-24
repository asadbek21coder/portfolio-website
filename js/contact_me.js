$( function() {
    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

//When clicking on Full hide fail/success boxes
$('#name').focus(function() {
    $('#success').html('');
});


buttonMy.onclick = async (event) => {
    event.preventDefault()
    myData = await {
        userName: nameMy.value,
        userEmail: email.value,
        userMessage: message.value,
    }
   response =  await fetch('http://localhost:8080/contacts', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(myData),
    })
    console.log(response)

    if (response.status==200) {
        ;(() => {
            $("#btnSubmit").attr("disabled", false);
            $('#success').html("<div class='alert alert-success'>");
            $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
            $('#success > .alert-success')
            .append("<strong>Your message has been sent. </strong>");
            $('#success > .alert-success')
            .append('</div>');
            
            //clear all fields
            $('#contactForm').trigger("reset");

        })()
    }
    else {
        ;(()=> {
            // Fail message
            $('#success').html("<div class='alert alert-danger'>");
            $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#success > .alert-danger').append("<strong>Sorry, there is no email/name/message . Please try again!");
            $('#success > .alert-danger').append('</div>');
            //clear all fields
            $('#contactForm').trigger("reset");
        })()
    }
}