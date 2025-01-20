'use client';
import {TextField, Button, List, ListItem, ListItemText, ListItemButton} from '@mui/material';
import {Grid} from "@mui/system";
import {useEffect, useState} from "react";

class Package {
    size: number = 0;
    quantity: number = 0;
}

class DefaultPacks {
    packs: number[] = []
}

export default function Home() {

    const [orderCount, setOrderCount] = useState("");
    const [packages, setPackages] = useState("");
    const [packagesList, setPackagesList] = useState<Package[]>([]);
    const [defaultPacks, setDefaultPacks] = useState<DefaultPacks>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        async function GetDefaultPacks(): Promise<DefaultPacks> {
            const query = await fetch('http://localhost:8080/default-packs')
            return await query.json()
        }

        GetDefaultPacks().then((data) => {
            console.log(data)
            if (data.packs.length > 0) {
                setPackages(data.packs.join(","))
                setDefaultPacks(data)
            }
        }).finally(() => {
            setLoading(false)
        })
    }, [])


    function GetSmallestPack() {
        async function GetSmallestPack(): Promise<Package[]> {
            const packSizes: number[] = packages.split(",").map(Number)
            const query = await fetch('http://localhost:8080/packs', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order: parseInt(orderCount),
                    packaging_sizes: packSizes
                })
            })
            return await query.json()
        }

        GetSmallestPack().then((data) => {
            setPackagesList(data)
        })
    }


    const clearPackageList = () => {
        setPackagesList([])
    }

    const clearFields = () => {
        setOrderCount("")
        setPackages("")
    }

    const handleOrderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        // Allow empty string or numeric values only
        if (newValue === "" || !isNaN(Number(newValue))) {
            setOrderCount(newValue);
        }
    };


    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1 className="text-4xl font-bold text-center">Welcome to the Smallest Package Finder</h1>
                {loading && <h6>Loading default packages...</h6>}
                {!!defaultPacks?.packs && <h6>The default packages are: {defaultPacks?.packs.join(",")}</h6>}

                <Grid container direction={'row'} spacing={4}>

                    <Grid size={{xs: 12, sm: 6, md: 6, lg: 6, xl: 6}}>
                        <TextField
                            label="Order Amount"
                            type="text" // Use "text" instead of "number" to allow empty strings
                            value={orderCount}
                            onChange={handleOrderChange}
                        />
                    </Grid>
                    <Grid size={{xs: 12, sm: 6, md: 6, lg: 6, xl: 6}}>
                        <TextField id="outlined-basic" type={"text"} label="Packages" variant="outlined"
                                   helperText={"Comma separated list of package sizes. eg: 25, 50"}
                                   value={packages}
                                   onChange={(e) => setPackages(e.target.value)}
                        />
                    </Grid>
                </Grid>

                <Grid container direction={'row'} spacing={4}>
                    <Grid size={{xs: 12, sm: 6, md: 6, lg: 6, xl: 6}}>
                        {
                            orderCount && packages &&
                            <Button variant='contained' onClick={GetSmallestPack}>
                                Get Smallest Pack
                            </Button>
                        }
                    </Grid>
                    <Grid size={{xs: 12, sm: 6, md: 6, lg: 6, xl: 6}}>
                        {(orderCount || packages) && <Button variant='contained' onClick={clearFields}>
                            Clear
                        </Button>}
                    </Grid>
                </Grid>

                {!!packagesList.length && <Grid>
                    <h2>Results: </h2>
                    <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                        {
                            packagesList.map((item, index) => {
                                return (
                                    <ListItem disablePadding key={index}>
                                        <ListItemButton>
                                            <ListItemText
                                                primary={`Package size: ${item.size} will be used ${item.quantity} times`}/>
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Grid>}

                {!!packagesList.length && <Grid size={{xs: 12, sm: 6, md: 6, lg: 6, xl: 6}}>
                    <Button variant='contained' onClick={clearPackageList}>
                        Clear Results
                    </Button>
                </Grid>}
            </main>
        </div>
    );
}
