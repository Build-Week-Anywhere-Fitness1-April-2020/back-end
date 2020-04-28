const express = require('express');
const router = express.Router();
const Class = require('./classesModel');

// Get list of classes
router.get('/', async (req, res) => {xw
    try {
      let classList = await Class.getClasses();
      for(let i=0; i<classList.length; i++){
        let instructor = await Class.getClassInstructor(classList[i].id);
        let imgUrl = await Class.getImgUrl(classList[i].imgUrl);
        let classType = await Class.getClassType(classList[i].classType);
        classList[i] = {
          ...classList[i],
          instructor: instructor[0].displayName,
          imgUrl: imgUrl[0].url,
          classType: classType[0].type
        }
      }
      res.status(200).json(classList);
    }
    catch(err){
      res.status(500).json(err);
    }
    
})

// Get class by id
router.get('/:id', async (req, res) => {
    try {
      let foundClass = await Class.getById(req.params.id);
      let instructor = await Class.getClassInstructor(req.params.id);
      let imgUrl = await Class.getImgUrl(foundClass[0].imgUrl);
      let classType = await Class.getClassType(foundClass[0].classType);
      console.log(classType);
      res.status(200).json({
        ...foundClass[0],
        instructor: instructor[0].displayName,
        imgUrl: imgUrl[0].url,
        classType: classType[0].type
      });
    }
    catch(err){
      res.status(500).json(err);
    }
})

router.post('/', validateNewClass, (req, res) => {
  const classData = req.body;

  Class.addClass(classData)
  .then(() => {
    res.status(201).json({ message: "Post Sucessful" });
  })
  .catch(err => {
    res.status(500).json({ 
      message: 'Failed to create new class',
      error: err
    });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Class.removeClass(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find class with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ 
      message: 'Failed to delete class',
      error: err
    });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Class.getById(id)
  .then(classes => {
    if (classes) {
      Class.updateClass(changes, id)
      .then(updatedClass => {
        res.json(updatedClass);
      });
    } else {
      res.status(404).json({ message: 'Could not find Class with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ 
      message: 'Failed to update Class',
      error: err
    });
  });
});


/////////////////~~~~~~~~~~~ATTENDEE SECTION~~~~~~~~~~~~~~~~~~~~~~~///////////
// Params: classId
// Returns: list of attendee objects for a given class
router.get('/:id/attendees', async (req, res) => {
  // Get the account ids that match the given class
  const accountIds = await Class.getAccountIds(req.params.id);
  let accounts = [];
  for(let i=0; i<accountIds.length; i++){
    let account = await Class.getAccountById(accountIds[i].accountId);
    accounts.push({
      ...account[0],
      password: undefined
    });
  }
  res.status(200).json(accounts);
})


function validateNewClass(req, res, next){
    const body = req.body;
    if(body.name || body.time || body.duration || body.intensity || body.location || body.maxSize || body.classType || body.imgUrl){
        next();
    }else{
        res.status(401).json({
            message: 'Missing field'
        })
    }
}

module.exports = router;