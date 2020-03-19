const db = require("../data/db-config.js");

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
  };
  
  function find() {
      return db("schemes");
  }

  function findById(id) {
    return db("schemes")
        .where({ id }) //this creates an object {id: id} with a key "id" and a value of the id passed into the function
        .first();
    }
  
  function findSteps(id) {
    return db("schemes")
        .join('steps', 'schemes.id', 'steps.scheme_id')
        .where('scheme_id', id)
        .select('steps.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions')
        .orderBy('steps.step_number', 'asc');
  }

  function add(scheme) {
    return db('schemes')
        .insert(scheme)
        .then(response => {
            //console.log(response)
            return findById(response[0]);
        });
  }

  function update(changes, id) {
    return db('schemes')
        .where({ id })
        .update(changes)
        .then(() => {
            return findById(id);
        });
    }

  function remove(id) {
    return findById(id)
        .then(scheme => {
            const deletedScheme = scheme;
            db('schemes')
                .where({ id })
                .del()
            return deletedScheme;
        })
  }


// async function remove(id) {
//     try {
//         const deletedScheme = await findById(id);
//         await db('schemes')
//             .where({ id })
//             .del();
//         return deletedScheme;
//     } catch (error) {
//         return null
//     }
// }