import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export function SubCard ({ name }: { name: string }) {
  return (
    <Card className="SubCard">
      <CardContent>
        r/{name}
      </CardContent>
    </Card>
  );
}