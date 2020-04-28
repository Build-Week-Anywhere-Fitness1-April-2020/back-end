const express = require('express');
const router = express.Router();
const Class = require('./classesModel');


router.get('/', (req, res) => {
    Class.getClasses()
    .then(classes => {
        res.status(200).json(classes);
    })
    .catch(err => {
        res.status(500).json({
          message: 'Failed to get classes',
          error: err
        });
    })
})

router.get('/:id', (req, res) => {
    Class.getById(req.params.id)
    .then(newClass => {
        res.status(200).json(newClass);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

/*
    Expect
    {
        name,
        dateTime,
        duration,
        intensity,
        location,
        maxSize,
        classType,
        imgUrl
    }
*/
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
router.post('/', (req, res) => {
  const attendeeData = req.body;

  Attendee.addAttendee(attendeeData)
  .then(attendee => {
    res.status(201).json(attendee);
  })
  .catch (err => {
    res.status(500).json({ 
      message: 'Failed to create new Attendee',
      error: err
    });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Attendee.removeAttendee(id)
  .then(deleted => {
    if (deleted) {
      res.json({ 
        message: 'Attendee successfully deleted',
        removed: deleted 
      });
    } else {
      res.status(404).json({ 
        message: 'Could not find Attendee with given id' 
      });
    }
  })
  .catch(err => {
    res.status(500).json({ 
      message: 'Failed to delete Attendee',
      error: err
    });
  });
});


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