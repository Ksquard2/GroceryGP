function received() {

        if (typeof(Storage) !== "undefined") {
        // Retrieve
            name = localStorage.getItem("name");
            foodGroups = localStorage.getItem("foodGroups")
            console.log("Retrieved successfully",name,foodGroups)
        }
    }