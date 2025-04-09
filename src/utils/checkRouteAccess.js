// RequestTypes: 1->Read,2->Update,3->Delete and 4->Create
function checkRouteAccess(requestType) {
  return (req, res, next) => {
   next()

    // if (req.user && req.user.privileges && typeof req.user.privileges === 'object'
    //   && req.user.privileges.length > 0 && req.user.privileges.find(row => row.moduleRoute === 'contacts')
    //   && req.user.privileges.find(row => row.moduleRoute === 'contacts').modulePermissions
    //   && typeof req.user.privileges.find(row => row.moduleRoute === 'contacts').modulePermissions === "string"
    //   && req.user.privileges.find(row => row.moduleRoute === 'contacts').modulePermissions.split(',').map(row => parseInt(row)).includes(requestType))
    //   next()
    // else
    //   res.status(401).json({
    //     error: {
    //       message: 'Access Denied!',
    //       reason: 'No Permission on Current Route!'
    //     }
    //   })
  }
}

module.exports = checkRouteAccess