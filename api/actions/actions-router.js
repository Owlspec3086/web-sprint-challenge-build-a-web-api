// Write your "actions" router here!
const express = require('express');

const router = express.Router();
const Actions = require('../actions/actions-model');

//to check if get is working
router.get('/', (req, res) => {
  Actions.get(req.query)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(() => {
      res.status(500).json({ erroMessage: 'Could not get all the actions' });
    });
});

//get request by ID
router.get('/:id', validateActionId, (req, res) => {
  res.status(200).json(req.action);
});

//put request
router.put('/:id', validateActionId, validateAction, (req, res) => {
  Actions.update(req.params.id, req.body)
    .then(() => {
      res.status(200).json(req.body);
    })
    .catch((err) => console.log(err));
});

// delete
router.delete('/:id', validateActionId, (req, res) => {
  Actions.get(req.params.id).then((action) => {
    if (action) {
      Actions.remove(req.params.id)
        .then((count) => {
          if (count) {
            res.status(200).json(action);
          }
        })
        .catch((err) => console.log(err));
    }
  });
});

function validateActionId(req, res, next) {
  Actions.get(req.params.id)
    .then((action) => {
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(404).json({ message: 'This Action is not found' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Error retreiving the Action' });
    });
}

// Custom middleware
function validateAction(req, res, next) {
  const action = req.body;
  if (action) {
    if (action.description || action.notes) {
      next();
    } else {
      res.status(400).json({ erroMessage: 'Insert a proper description' });
    }
  } else {
    res.status(400).json({ erroMessage: '' });
  }
}

module.exports = router;
