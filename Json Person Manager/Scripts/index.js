$(() => {

    $.post('/home/GetAll', function (ppl) {
        ppl.forEach(addPersonToTable)

    });

    const addPersonToTable = person => {
        $("#person-table").append(`<tr>
                                        <td>${person.FirstName}</td>
                                        <td>${person.LastName}</td>
                                        <td>${person.Age}</td>
                                        <td><button data-id=${person.Id} id="edit" class="btn btn-warning" data-toggle="modal" data-target="#exampleModal" >Edit</button></td>
                                        <td><button id="delete" class="btn btn-danger" data-id=${person.Id}>Delete</button></td>
                                        
                                        </tr>`);
    }

    $("#add-btn").on('click', function () {
            $.post('/home/add', {
                firstName: $("#firstName").val(),
                lastName: $("#lastName").val(),
                age: $("#age").val()
            }, function () {
                $("#person-table").find("tr:gt(0)").remove();
                $.post('/home/GetAll', function (ppl) {
                    ppl.forEach(addPersonToTable)
                });
            });

        });
        $('#person-table').on('click', '#delete', function () {

            const id = $(this).data('id');
            console.log(id);
            $.post('/home/delete', { id }, function () {
                $("#person-table").find("tr:gt(0)").remove();
                $.post('/home/GetAll', function (ppl) {
                    ppl.forEach(addPersonToTable)

                });


            });
        });

        $('#person-table').on('click', '#edit', function () {

            const id = $(this).data('id');
            console.log(id);
            $.post('/home/editperson', { id }, function (person) {
                $("#editFirstName").val(`${person.FirstName}`)
                $("#editLastName").val(`${person.LastName}`)
                $("#editAge").val(`${person.Age}`)
                $("#editId").val(`${person.Id}`)

                $("#person-table").find("tr:gt(0)").remove();
                $.post('/home/GetAll', function (ppl) {
                    ppl.forEach(addPersonToTable)

                });
            });

        });

        $('#update').on('click', function () {
            console.log("hello");
            $.post('/home/Update', {
                firstName: $("#editFirstName").val(), lastName: $("#editLastName").val(),
                age: $("#editAge").val(), id: $("#editId").val()
            }, function () {
                $("#person-table").find("tr:gt(0)").remove();
                $.post('/home/GetAll', function (ppl) {
                    ppl.forEach(addPersonToTable)
                });
            });
        });
    });

